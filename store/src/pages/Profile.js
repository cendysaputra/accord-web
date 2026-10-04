import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import "./auth.css";

export default function Profile() {
  const [me, setMe] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/api/users/me")
      .then((res) => setMe(res.data))
      .catch(() => setError("Sesi berakhir, silakan login kembali."));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className="auth">
      <div className="auth-inner container">
        <div className="auth-box">
          <h1 className="auth-title">
            Profil<span className="dot">.</span>
          </h1>

          {error && <p className="auth-msg">{error}</p>}

          {!error && !me && <p className="auth-lead">Memuat data...</p>}

          {me && (
            <div className="profile-list">
              <div className="profile-row">
                <span>Nama</span>
                <strong>{me.name}</strong>
              </div>
              <div className="profile-row">
                <span>Email</span>
                <strong>{me.email}</strong>
              </div>
              <div className="profile-row">
                <span>Terdaftar sejak</span>
                <strong>
                  {new Date(me.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </strong>
              </div>
            </div>
          )}

          <button className="auth-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}