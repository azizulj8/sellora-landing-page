import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Route as AuthRoute } from "./route";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Package, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/store")({
  head: () => ({ meta: [{ title: "Toko Saya — Sellora-AI" }] }),
  component: StorePage,
});

const storeSchema = z.object({
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().max(500).optional(),
  wa_number: z.string().trim().min(9).max(20),
  address: z.string().trim().max(255).optional(),
});

const productSchema = z.object({
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().max(500).optional(),
  price: z.number().int().min(0).max(100000000),
  image_url: z.string().trim().url().max(500).optional().or(z.literal("")),
});

function StorePage() {
  const { user } = AuthRoute.useRouteContext();
  const qc = useQueryClient();
  const [productDialog, setProductDialog] = useState<{ open: boolean; editing?: any }>({ open: false });

  const storeQ = useQuery({
    queryKey: ["my-store", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("owner_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const productsQ = useQuery({
    queryKey: ["my-products", storeQ.data?.id],
    enabled: !!storeQ.data?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("store_id", storeQ.data!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveStore = useMutation({
    mutationFn: async (form: FormData) => {
      const parsed = storeSchema.parse({
        name: form.get("name"),
        description: form.get("description") || undefined,
        wa_number: form.get("wa_number"),
        address: form.get("address") || undefined,
      });
      const payload = { ...parsed, owner_id: user.id };
      if (storeQ.data) {
        const { error } = await supabase.from("stores").update(payload).eq("id", storeQ.data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("stores").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Toko disimpan");
      qc.invalidateQueries({ queryKey: ["my-store"] });
    },
    onError: (e: any) => toast.error(e.message || "Gagal menyimpan"),
  });

  const toggleActive = useMutation({
    mutationFn: async (active: boolean) => {
      const { error } = await supabase.from("stores").update({ is_active: active }).eq("id", storeQ.data!.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-store"] }),
  });

  const saveProduct = useMutation({
    mutationFn: async (form: FormData) => {
      const parsed = productSchema.parse({
        name: form.get("name"),
        description: form.get("description") || undefined,
        price: Number(form.get("price") || 0),
        image_url: form.get("image_url") || "",
      });
      const payload = {
        store_id: storeQ.data!.id,
        name: parsed.name,
        description: parsed.description,
        price: parsed.price,
        image_url: parsed.image_url || null,
      };
      if (productDialog.editing) {
        const { error } = await supabase.from("products").update(payload).eq("id", productDialog.editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Produk disimpan");
      setProductDialog({ open: false });
      qc.invalidateQueries({ queryKey: ["my-products"] });
    },
    onError: (e: any) => toast.error(e.message || "Gagal menyimpan"),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Produk dihapus");
      qc.invalidateQueries({ queryKey: ["my-products"] });
    },
  });

  if (storeQ.isLoading) {
    return <div className="grid place-items-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Toko Saya</h1>
        <p className="text-muted-foreground mt-1">Atur informasi toko dan kelola katalog produk kamu.</p>
      </div>

      {/* Store form */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-4 gap-4">
          <div>
            <h2 className="font-bold text-lg">Informasi Toko</h2>
            <p className="text-sm text-muted-foreground">Detail yang muncul di katalog pelanggan.</p>
          </div>
          {storeQ.data && (
            <div className="flex items-center gap-2">
              <Switch
                checked={storeQ.data.is_active}
                onCheckedChange={(v) => toggleActive.mutate(v)}
              />
              <span className="text-sm font-medium">{storeQ.data.is_active ? "Aktif" : "Non-aktif"}</span>
            </div>
          )}
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); saveStore.mutate(new FormData(e.currentTarget)); }}
          className="space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nama Toko</Label>
              <Input id="name" name="name" required defaultValue={storeQ.data?.name ?? ""} placeholder="Warung Bu Siti" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="wa_number">Nomor WhatsApp</Label>
              <Input id="wa_number" name="wa_number" required defaultValue={storeQ.data?.wa_number ?? ""} placeholder="081234567890" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address">Alamat</Label>
            <Input id="address" name="address" defaultValue={storeQ.data?.address ?? ""} placeholder="Jl. Sudirman No. 1" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea id="description" name="description" rows={3} defaultValue={storeQ.data?.description ?? ""} placeholder="Ceritakan tentang toko kamu..." />
          </div>
          <Button type="submit" disabled={saveStore.isPending}>
            {saveStore.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : storeQ.data ? "Simpan Perubahan" : "Buat Toko"}
          </Button>
        </form>
      </Card>

      {/* Products */}
      {storeQ.data && (
        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-lg">Produk</h2>
              <p className="text-sm text-muted-foreground">{productsQ.data?.length ?? 0} produk</p>
            </div>
            <Dialog open={productDialog.open} onOpenChange={(o) => setProductDialog({ open: o })}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Tambah Produk</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{productDialog.editing ? "Ubah Produk" : "Produk Baru"}</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => { e.preventDefault(); saveProduct.mutate(new FormData(e.currentTarget)); }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="p-name">Nama</Label>
                    <Input id="p-name" name="name" required defaultValue={productDialog.editing?.name ?? ""} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="p-price">Harga (Rp)</Label>
                    <Input id="p-price" name="price" type="number" min="0" required defaultValue={productDialog.editing?.price ?? 0} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="p-image">URL Gambar (opsional)</Label>
                    <Input id="p-image" name="image_url" type="url" defaultValue={productDialog.editing?.image_url ?? ""} placeholder="https://..." />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="p-desc">Deskripsi</Label>
                    <Textarea id="p-desc" name="description" rows={3} defaultValue={productDialog.editing?.description ?? ""} />
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={saveProduct.isPending}>
                      {saveProduct.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simpan"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {productsQ.data?.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Package className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Belum ada produk. Yuk tambahkan menu pertama!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {productsQ.data?.map((p) => (
                <div key={p.id} className="rounded-lg border border-border p-4 flex flex-col">
                  {p.image_url && (
                    <img src={p.image_url} alt={p.name} className="w-full h-32 object-cover rounded-md mb-3" loading="lazy" />
                  )}
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-primary font-bold mt-1">Rp{p.price.toLocaleString("id-ID")}</p>
                  {p.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description}</p>}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setProductDialog({ open: true, editing: p })}>
                      <Pencil className="h-3 w-3 mr-1" /> Ubah
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { if (confirm("Hapus produk ini?")) deleteProduct.mutate(p.id); }}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
