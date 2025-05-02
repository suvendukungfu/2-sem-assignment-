
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import AlertForm from "@/components/alerts/AlertForm";

const CreateAlert = () => {
  return (
    <MainLayout>
      <div className="container mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Report New Incident</h1>
          <p className="text-gray-600 mt-1">
            Submit details about a new accident or incident
          </p>
        </header>
        
        <AlertForm />
      </div>
    </MainLayout>
  );
};

export default CreateAlert;
