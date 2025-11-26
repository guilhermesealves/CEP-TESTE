import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const [showFields, setShowFields] = useState(false);

  const onSubmit = (e) => {
    console.log(e);
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          alert("CEP não encontrado!");
          return;
        }

        setShowFields(true);

        setValue("address", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("uf", data.uf);
        setFocus("addressNumber");
      });
  };
  const handleCancel = () => {
    setShowFields(false);
    setValue("address", "");
    setValue("addressNumber", "");
    setValue("neighborhood", "");
    setValue("city", "");
    setValue("uf", "");
    setFocus("cep");
  };


  return (
    <div className="FormAll">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Consultar CEP</h1>

        {/* CAMPO CEP */}
        <div className="input-group">
          <label>
            CEP *
            <input type="text" {...register("cep")} onBlur={checkCEP} />
          </label>
        </div>

        {/* CAMPOS QUE APARECEM DEPOIS */}
        <div className={`hidden-fields ${showFields ? "show" : ""}`}>
          <div className="input-group">
            <label>
              Rua
              <input type="text" {...register("address")} />
            </label>

            <label>
              Número
              <input type="text" {...register("addressNumber")} />
            </label>
          </div>

          <div className="input-group">
            <label>
              Bairro
              <input type="text" {...register("neighborhood")} />
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
            <button type="button" onClick={handleCancel} className="cancel">
              Cancelar
            </button>

            <button onhan className="send">Enviar</button>
          </div>
        </div>
      </form>
    </div>

  );
}

export default App;