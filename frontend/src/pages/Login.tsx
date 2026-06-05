// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   authService,
//   setToken,
//   setUsernameStorage,
// } from "@/services/authService";

// export default function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isRegister, setIsRegister] = useState(false);

//   const handleSubmit = async () => {
//     if (!username || !password) {
//       setError("Täytä kaikki kentät.");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     try {
//       const res = isRegister
//         ? await authService.register(username, password)
//         : await authService.login(username, password);
//       setToken(res.token);
//       setUsernameStorage(username);
//       navigate("/");
//     } catch {
//       setError(
//         isRegister
//           ? "Rekisteröinti epäonnistui."
//           : "Väärä käyttäjänimi tai salasana.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputCls =
//     "w-full px-3 py-2 rounded-lg text-sm border outline-none focus:border-[#00d4aa] transition-colors font-mono";
//   const inputStyle = {
//     backgroundColor: "#0a0a0f",
//     borderColor: "#1e1e2e",
//     color: "#e2e8f0",
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center"
//       style={{ backgroundColor: "#0a0a0f" }}
//     >
//       <div
//         className="w-full max-w-sm space-y-6 rounded-xl border p-8"
//         style={{ backgroundColor: "#111118", borderColor: "#1e1e2e" }}
//       >
//         <div className="text-center">
//           <p
//             className="text-2xl font-bold font-mono"
//             style={{ color: "#00d4aa" }}
//           >
//             📈 TradeJournal
//           </p>
//           <p className="text-sm mt-1" style={{ color: "#64748b" }}>
//             {isRegister ? "Luo uusi tili" : "Kirjaudu sisään"}
//           </p>
//         </div>
//         <div className="space-y-3">
//           <input
//             className={inputCls}
//             style={inputStyle}
//             placeholder="Käyttäjänimi"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             className={inputCls}
//             style={inputStyle}
//             placeholder="Salasana"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//           />
//         </div>
//         {error && (
//           <p className="text-sm" style={{ color: "#ef4444" }}>
//             {error}
//           </p>
//         )}
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full py-2.5 rounded-lg font-medium text-sm transition-opacity hover:opacity-80 disabled:opacity-40"
//           style={{ backgroundColor: "#00d4aa", color: "#0a0a0f" }}
//         >
//           {loading ? "..." : isRegister ? "Rekisteröidy" : "Kirjaudu"}
//         </button>
//         <p className="text-center text-sm" style={{ color: "#64748b" }}>
//           {isRegister ? "Onko sinulla jo tili? " : "Ei tiliä? "}
//           <button
//             onClick={() => setIsRegister((r) => !r)}
//             style={{ color: "#00d4aa" }}
//             className="hover:underline"
//           >
//             {isRegister ? "Kirjaudu" : "Rekisteröidy"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }
