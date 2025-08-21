import React from 'react';
import CategoryForm from "@/components/form/CategoryForm";
import AdminControl from "@/components/AdminControl";

const Create = () => {
  return (
    <AdminControl>
      <div className={"px-4"}>
        <CategoryForm/>
      </div>
    </AdminControl>
  );
};

export default Create;
