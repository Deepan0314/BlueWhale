import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-slate-600">Page not found</p>
        <Link to="/" className="mt-6 inline-block text-blue-600">Go home</Link>
      </div>
    </div>
  );
}
