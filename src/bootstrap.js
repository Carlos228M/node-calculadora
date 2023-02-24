import { operations } from '#constants/operations.js';
import { InvalidInputError } from '#errors/invalidInputError.js';
import { extractByRegex } from '#lib/extractByRegex.js';
import { promptQuestion } from '#lib/promptQuestion.js';

export const bootstrap = async () => {
   try {
      // 1 Capturar la entrada
      const userAnswer = await promptQuestion('Introduce tu operación: ');

      // 2 Validar la entrada y serparar las partes entre operando y operadores
      const standarizeInput = userAnswer.trim().replaceAll(',', '.');

      if (!standarizeInput) throw new InvalidInputError();
      if (standarizeInput === 'exit') {
         return true;
      }

      const [firstOperating, operator, secondOperating] = extractByRegex(standarizeInput);

      // 3 Operar y redondear
      const result = operations[operator](firstOperating, secondOperating);
      const roundedResult = Number(Math.round(result + 'e+5') + 'e-5');

      // 4 Mostrar el resultado por pantalla
      if (isNaN(roundedResult) || !isFinite(roundedResult)) console.log('OPERACIÓN NO VÁLIDA\n');
      else console.log(`El resultado es ${roundedResult}\n`);
   } catch (error) {
      if (error instanceof InvalidInputError) console.log(error.message);
      else console.log(`Error no conocido:  ${error.message}. Stack: ${error.stack}\n`);
   }
};
