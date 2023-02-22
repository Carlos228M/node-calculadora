import { InvalidInputError } from '#errors/invalidInputError.js';
import { getOperator } from '#lib/getOperator.js';
import { promptQuestion } from '#lib/promptQuestion.js';
(async () => {
   const userAnswer = await promptQuestion('Introduce tu operación: ');
   console.log(userAnswer);

   // 2 Validar la entrada y serparar las partes entre operando y operadores
   const standarizeInput = userAnswer.trim();

   try {
      if (standarizeInput === '') throw new InvalidInputError();

      const operator = getOperator(standarizeInput);

      if (!operator) throw new InvalidInputError();
   } catch (error) {
      if (error instanceof InvalidInputError) console.log(error.message);
      else
         console.log(
            `Error no controlado:  ${error.message}. Stack: ${error.stack}`
         );
   }

   // 3 Operar

   // 4 Mostrar resultado
})();
