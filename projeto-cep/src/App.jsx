import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const [showFields, setShowFields] = useState(false);
  const [showErrorBox, setShowErrorBox] = useState(false);


  const buscarCEP = (cepInput, isAuto = false) => {
    const cep = cepInput.replace(/\D/g, "");

    if (!isAuto && cep.length !== 8) {
     
      setShowErrorBox(true);
      return;
    }

    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.erro) {
            setShowErrorBox(true);
            return;
          }

          setShowFields(true);
          setValue("cep", cep);
          setValue("address", data.logradouro);
          setValue("neighborhood", data.bairro);
          setValue("city", data.localidade);
          setValue("uf", data.uf);

          if (isAuto) setFocus("addressNumber");
        });
    }
  };

  const handleCepChange = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    setValue("cep", cep);


    if (!showFields && cep.length === 8) {
      buscarCEP(cep, true);
    }
  };

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

  return (
    <div className="FormAll">
    
      {showErrorBox && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>CEP inválido</h2>
            <p>O CEP precisa ter exatamente 8 números ou não foi encontrado.</p>
            <button className="btn-back" onClick={() => setShowErrorBox(false)}>
              Voltar
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(() => alert("Formulário enviado!"))}>
        <h1>Consultar CEP</h1>

      
        <div className="input-group single-column">
          <label>
            CEP *
            <input
              type="text"
              maxLength="8"
              {...register("cep")}
              onChange={handleCepChange}
            />
          </label>
        </div>



    
        {!showFields && (
          <div className="buttons">
            <button
              type="button"
              className="send"
              onClick={() => buscarCEP(document.querySelector('input[name="cep"]').value, false)}
            >
              Consultar CEP
            </button>
          </div>
        )}

     
        {showFields && (
          <div className="form-box animate-form">
            <div className="input-group">
              <label>
                Rua
                <input type="text" {...register("address")} />
              </label>

              <label>
                Bairro
                <input type="text" {...register("neighborhood")} />
              </label>
            </div>

            <div className="input-group">
              <label>
                Número
                <input type="text" {...register("addressNumber")} />
              </label>

              <label>
                Cidade
                <input type="text" {...register("city")} />
              </label>
            </div>

            <div className="input-group">
              <label>
                Estado
                <input type="text" {...register("uf")} />
              </label>
            </div>

          
            <div className="buttons">
              <button
                type="button"
                className="send"
                onClick={() => buscarCEP(document.querySelector('input[name="cep"]').value, false)}
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
