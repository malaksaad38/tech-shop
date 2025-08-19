import AdminProductsComponent from "@/components/AdminProductsComponent";
import AdminControl from "@/components/AdminControl";

export default function AdminPage() {
  return (
    <AdminControl>
      <div className={"container mx-auto"}>
        <h1 className={"text-3xl font-bold pt-6"}>Admin Dashboard</h1>
        <AdminProductsComponent/>
      </div>
    </AdminControl>
  )
}
