import React from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

function App() {

  const {register, handleSubmit, setValue, setFocus} = useForm();

  const onSubmit = (e) => {
    console.log(e);
  }

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length !== 8) return;
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
       if (data.erro) {
        alert("CEP não encontrado!");
        return; 
      }
      console.log(data);
      setValue('address', data.logradouro);
      setValue('neighborhood', data.bairro);
      setValue('city', data.localidade);
      setValue('uf', data.uf);
      setFocus('addressNumber');
    });
  }

  return (
    <div className="FormAll">
  <form onSubmit={handleSubmit(onSubmit)}>
    <h1>Add Event</h1>

    <div className="input-group">
      <label>
        CEP *
        <input type="text" {...register("cep")} onBlur={checkCEP} />
      </label>

      <label>
        Rua
        <input type="text" {...register("address")} />
      </label>
    </div>

    <div className="input-group">
      <label>
        Número
        <input type="text" {...register("addressNumber")} />
      </label>

      <label>
        Bairro
        <input type="text" {...register("neighborhood")} />
      </label>
    </div>

    <div className="input-group">
      <label>
        Cidade
        <input type="text" {...register("city")} />
      </label>

      <label>
        Estado
        <input type="text" {...register("uf")} />
      </label>
    </div>

    <div className="buttons">
      <button type="button" className="cancel">Cancelar</button>
      <button type="submit" className="send">Enviar</button>
    </div>
  </form>
</div>

  );
}

export default App;