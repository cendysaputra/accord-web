import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import "./auth.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await axiosClient.post("/api/users/register", form);
      navigate("/login");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth">
      <div className="auth-inner container">
        <div className="auth-box">
          <h1 className="auth-title">
            Register<span className="dot">.</span>
          </h1>
          <p className="auth-lead">Buat akun untuk mulai menggunakan Accord.</p>

          <form className="auth-form" onSubmit={onSubmit}>
            <label className="auth-field">
              <span>Nama</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>

            <label className="auth-field">
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </label>

            <button className="auth-button" type="submit" disabled={loading}>
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </form>

          {msg && <p className="auth-msg">{msg}</p>}

          <p className="auth-foot">
            Sudah punya akun? <Link to="/login">Masuk di sini</Link>
          </p>
        </div>
      </div>
    </section>
  );
}