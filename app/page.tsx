"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, FileText, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Document = {
  name: string;
  verified: boolean;
  selected?: boolean;
  link: string;
};

export default function Siddharth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [documents, setDocuments] = useState<Document[]>([
    { name: "Aadhaar Card", verified: true, selected: false, link: "https://drive.google.com/file/d/1_FNu57sLgM6SlVz7cD0hhAeSfSs8EwP3/view?usp=drive_link" },
    { name: "Driving License", verified: false, selected: false, link: "https://drive.google.com/file/d/18VvH0TD2KGj-OaeKNSDL5mj1f1S6Bw4Q/view?usp=drive_link" },
    { name: "PAN Card", verified: true, selected: false, link: "https://drive.google.com/file/d/1zaImSblQNzPbprjz3ACzaYvqGUSwrjNP/view?usp=drive_link" },
  ]);
  const [allDocumentsSelected, setAllDocumentsSelected] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "127070") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleDocumentSelection = (index: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index].selected = !updatedDocuments[index].selected;
    setDocuments(updatedDocuments);
    setAllDocumentsSelected(updatedDocuments.every((doc) => doc.selected));
  };

  const handleSelectAll = () => {
    const updatedDocuments = documents.map((doc) => ({
      ...doc,
      selected: !allDocumentsSelected,
    }));
    setDocuments(updatedDocuments);
    setAllDocumentsSelected(!allDocumentsSelected);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Lock className="w-12 h-12 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Secure Dashboard</h1>
            <p className="text-gray-500 text-center">
              Please enter your password to access the dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <Button type="submit" className="w-full">
              Access Dashboard
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-500 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4 flex flex-wrap justify-between items-center">
        <Image src="/logo.png" alt="TrueDoc Logo" width={200} height={50} className="h-8 w-auto" />
        <ul className="flex flex-wrap space-x-4 text-sm font-medium text-gray-700 sm:space-x-6">
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Home</li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Profile</li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Documents</li>
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center flex-grow p-4 sm:p-8">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 flex flex-col sm:flex-row items-center">
            <Image
              src="/Siddharth.JPG"
              alt="Siddharth Sharma"
              width={120}
              height={120}
              className="rounded-full border-4 border-white mb-4 sm:mb-0 sm:mr-6"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-white">Siddharth Sharma</h1>
              <p className="text-white mt-1">Digital Identity Verified</p>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-900">Name: Siddharth Sharma</span>
                </p>
                <p>
                  <span className="font-medium text-gray-900">Date of Birth: 20-03-1995</span>
                </p>
                <p>
                  <span className="font-medium text-gray-900">Gender: Male</span>
                </p>
                <p>
                  <span className="font-medium text-gray-900">Contact No.: *****4321</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Verification</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                  <input
                    type="checkbox"
                    checked={allDocumentsSelected}
                    onChange={handleSelectAll}
                    className="mr-3"
                  />
                  <span className="text-sm font-medium text-gray-700">Select All</span>
                </div>
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-3 rounded-md"
                  >
                    <input
                      type="checkbox"
                      checked={doc.selected || false}
                      onChange={() => handleDocumentSelection(index)}
                      className="mr-3"
                    />
                    <FileText
                      className={`mr-3 ${
                        doc.verified ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                    <span className={doc.verified ? "text-green-700 font-medium" : "text-gray-600"}>
                      {doc.name}
                    </span>
                    <a
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6 space-y-4 sm:space-y-0">
          <div className="text-gray-500 text-sm">© 2024 TrueDoc. All Rights Reserved.</div>
          <Image src="/logo.png" alt="TrueDoc Logo" width={80} height={30} className="h-8 w-auto" />
        </div>
      </footer>
    </div>
  );
}