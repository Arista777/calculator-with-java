document.addEventListener('DOMContentLoaded', function() {
      const display = document.getElementById('display');
      const clearButton = document.getElementById('clear');
      const equalsButton = document.getElementById('equals');
      const decimalButton = document.getElementById('decimal');

      let lastInput = '';
      let lastResult = '';

      // Función para evaluar y mostrar el resultado en el display
      function evaluateExpression() {
        try {
          const result = eval(display.innerText);
          display.innerText = Math.round(result * 10000) / 10000; // Redondear el resultado a 4 decimales
          lastResult = display.innerText;
        } catch (error) {
          display.innerText = 'Error';
        }
      }

      // Event listeners para los botones de números y operadores
      document.querySelectorAll('#calculator button').forEach(item => {
        item.addEventListener('click', event => {
          const buttonText = event.target.innerText;

          // Manejo de operadores
          if ('+-*/'.includes(buttonText)) {
            // Si el último input fue un operador, reemplazarlo con el nuevo
            if ('+-*/'.includes(lastInput)) {
              // Reemplazar el último operador
              display.innerText = display.innerText.slice(0, -1) + buttonText;
            } else {
              display.innerText += buttonText;
            }
          }
          // Manejo de números
          else if ('1234567890'.includes(buttonText)) {
            // No permitir que un número comience con múltiples ceros
            if (display.innerText === '0') {
              display.innerText = buttonText;
            } else {
              display.innerText += buttonText;
            }
          }
          // Manejo del punto decimal
          else if (buttonText === '.') {
            // No permitir dos puntos decimales en un número
            if (!display.innerText.includes('.')) {
              display.innerText += buttonText;
            }
          }
          // Manejo del botón AC (limpiar)
          else if (buttonText === 'AC') {
            display.innerText = '0';
          }
          // Manejo del botón de igual
          else if (buttonText === '=') {
            evaluateExpression();
          }

          lastInput = buttonText;
        });
      });
    });
