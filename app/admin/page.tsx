import AdminProductsComponent from "@/components/AdminProductsComponent";
import AdminControl from "@/components/AdminControl";

export default function AdminPage() {
  return (
    <AdminControl>
      <div className={"container mx-auto p-6 my-6"}>
        <h1 className={"text-3xl font-bold pb-6"}>Admin Dashboard</h1>
        <AdminProductsComponent/>
      </div>
    </AdminControl>
  )
}
