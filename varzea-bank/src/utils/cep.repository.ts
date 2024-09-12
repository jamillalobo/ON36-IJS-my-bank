import axios from "axios";

export class CepRepository {
    public async getCep(cep: string): Promise<string> {
        try {
          const url = `https://viacep.com.br/ws/${cep}/json/`;
    
          const response = await axios.get(url)
            .then(response => {
              return response.data;
            }).catch(error => {
              console.log('error in fetching cep', error);
            }
          );
          return response.data.logradouro;
        } catch (error) { 
          console.log('error in fetching data', error);
        }
      }
}

