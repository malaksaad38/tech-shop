import React from 'react';
import ProductForm from "@/components/form/ProductForm";
import AdminControl from "@/components/AdminControl";

const Create = () => {
  return (
    <AdminControl>
      <div className={"px-4"}>
        <ProductForm/>
      </div>
    </AdminControl>
  );
};

export default Create;
