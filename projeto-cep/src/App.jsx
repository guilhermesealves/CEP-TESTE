import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const { register, setValue, setFocus } = useForm();
  const [showFields, setShowFields] = useState(false);
  const [showErrorBox, setShowErrorBox] = useState(false);

  const resetForm = () => {
    setShowFields(false);
    setShowErrorBox(false);
    setValue("cep", "");
    setValue("address", "");
    setValue("neighborhood", "");
    setValue("city", "");
    setValue("uf", "");
    setValue("addressNumber", "");
  };

  const buscarCEP = async (cepInput) => {
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
      setValue("address", data.logradouro);
      setValue("neighborhood", data.bairro);
      setValue("city", data.localidade);
      setValue("uf", data.uf);
      setFocus("addressNumber");
    } catch (err) {
      setShowErrorBox(true);
    }
  };

  return (
    <div className="FormAll">
      {/* MODAL DE ERRO */}
      {showErrorBox && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Ops! CEP inválido</h2>
            <p>
              V"O CEP deve conter exatamente 8 números e corresponder a um endereço válido
             
            </p>
            <button className="btn-back" onClick={() => setShowErrorBox(false)}>
              Voltar
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => e.preventDefault()} // previne envio do form
      >
        <h1>Consultar CEP</h1>

        {/* Input CEP centralizado */}
        <div className="input-group single-column">
          <label>
            CEP *
            <input
              type="text"
              name="cep"
              maxLength="8"
              {...register("cep")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  buscarCEP(e.target.value);
                }
              }}
            />
          </label>
        </div>

        {/* Botão Consultar CEP no início */}
        {!showFields && (
          <div className="buttons">
            <button
              type="button"
              className="send"
              onClick={() =>
                buscarCEP(document.querySelector('input[name="cep"]').value)
              }
            >
              Consultar CEP
            </button>
          </div>
        )}

        {/* Inputs após buscar CEP */}
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

            {/* Botões lado a lado */}
            <div className="buttons">
              <button
                type="button"
                className="send"
                onClick={() =>
                  buscarCEP(document.querySelector('input[name="cep"]').value)
                }
              >
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
