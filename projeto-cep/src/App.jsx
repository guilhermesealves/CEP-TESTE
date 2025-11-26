import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const { register, setValue, setFocus, getValues, reset } = useForm();
  const [showFields, setShowFields] = useState(false);
  const [showErrorBox, setShowErrorBox] = useState(false);

  const resetForm = () => {
    setShowFields(false);
    setShowErrorBox(false);
    reset({
      cep: "",
      address: "",
      neighborhood: "",
      city: "",
      uf: "",
      addressNumber: "",
    });
  };

  const buscarCEP = async () => {
    const cepInput = getValues("cep");
    const cep = cepInput.replace(/\D/g, "");

    if (cep.length !== 8) {
      setShowErrorBox(true);
      return;
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        setShowErrorBox(true);
        return;
      }

      setShowFields(true);
      setValue("address", data.logradouro || "");
      setValue("neighborhood", data.bairro || "");
      setValue("city", data.localidade || "");
      setValue("uf", data.uf || "");
      setFocus("addressNumber");
    } catch (err) {
      setShowErrorBox(true);
    }
  };

  return (
    <div className="FormAll">
      {showErrorBox && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>
              O CEP deve conter exatamente 8 números e corresponder a um
              endereço válido.
            </p>
            <button className="btn-back" onClick={() => setShowErrorBox(false)}>
              Voltar
            </button>
          </div>
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Consultar CEP</h1>

        <div className="input-group single-column">
          <label>
            CEP *
            <input
              type="text"
              name="cep"
              maxLength="8"
              {...register("cep")}
              onKeyDown={(e) => {
                // Bloqueia letras e caracteres especiais
                if (
                  !(
                    (e.key >= "0" && e.key <= "9") || // números
                    e.key === "Backspace" ||
                    e.key === "Delete" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === "Tab"
                  )
                ) {
                  e.preventDefault();
                }

                // Consulta ao pressionar Enter
                if (e.key === "Enter") {
                  e.preventDefault();
                  buscarCEP();
                }
              }}
            />
          </label>
        </div>

        {!showFields && (
          <div className="buttons">
            <button type="button" className="send" onClick={buscarCEP}>
              Consultar CEP
            </button>
          </div>
        )}

        {showFields && (
          <div className="form-box animate-form">
            <div className="input-group two-columns">
              <label>
                Rua
                <input type="text" {...register("address")} />
              </label>
              <label>
                Bairro
                <input type="text" {...register("neighborhood")} />
              </label>
            </div>

            <div className="input-group two-columns">
              <label>
                Número
                <input type="text" {...register("addressNumber")} />
              </label>
              <label>
                Cidade
                <input type="text" {...register("city")} />
              </label>
            </div>

            <div className="input-group single-column">
              <label>
                Estado
                <input type="text" {...register("uf")} />
              </label>
            </div>

            <div className="buttons">
              <button type="button" className="send" onClick={buscarCEP}>
                Consultar CEP
              </button>
              <button type="button" className="send" onClick={resetForm}>
                Limpar
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
