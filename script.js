document.addEventListener('DOMContentLoaded', () => {
    const courseContent = document.getElementById('course-content');
    const progressBar = document.getElementById('progress-bar');
    const nextBtn = document.getElementById('next-btn');

    const modules = [
        {
            title: 'Módulo 1: Introducción al Picking',
            summary: 'El picking (preparación de pedidos) es el proceso de recoger artículos de un almacén para cumplir con los pedidos de los clientes. Es una de las operaciones más costosas y críticas en un almacén, ya que impacta directamente en la satisfacción del cliente. Existen diferentes tipos, como el picking discreto, por lotes o por zonas.',
            quiz: {
                question: '¿Cuál es el objetivo principal del picking?',
                options: [
                    'Almacenar nuevos productos',
                    'Cumplir con los pedidos de los clientes',
                    'Limpiar el almacén',
                    'Realizar el inventario'
                ],
                answer: 'Cumplir con los pedidos de los clientes'
            }
        },
        {
            title: 'Módulo 2: El Proceso de Picking',
            summary: 'El proceso comienza con la recepción de una lista de picking, que detalla los productos y las cantidades a recoger. El operario localiza los productos en sus ubicaciones, los recoge, verifica que sean los correctos y finalmente los empaqueta para su envío.',
            quiz: {
                question: '¿Cuál es el primer paso en el proceso de picking?',
                options: [
                    'Empaquetar los productos',
                    'Verificar los productos',
                    'Recibir la lista de picking',
                    'Localizar los productos'
                ],
                answer: 'Recibir la lista de picking'
            }
        },
        {
            title: 'Módulo 3: Herramientas y Equipos',
            summary: 'Para realizar el picking de forma eficiente se utilizan diversas herramientas. Las terminales portátiles (handhelds) muestran las listas de picking y permiten confirmar las recogidas. Los carros de picking transportan los productos y los escáneres de código de barras ayudan a verificar los artículos rápidamente.',
            quiz: {
                question: '¿Qué herramienta se utiliza para verificar los artículos rápidamente?',
                options: [
                    'Carro de picking',
                    'Terminal portátil',
                    'Escáner de código de barras',
                    'Cinta transportadora'
                ],
                answer: 'Escáner de código de barras'
            }
        },
        {
            title: 'Módulo 4: Seguridad en el Picking',
            summary: 'La seguridad es fundamental. Esto incluye el uso de técnicas de levantamiento adecuadas para evitar lesiones, seguir las normas de seguridad del almacén (como la circulación de vehículos) y tener cuidado al manipular materiales peligrosos, utilizando el equipo de protección personal (EPP) necesario.',
            quiz: {
                question: '¿Qué significa EPP?',
                options: [
                    'Equipo de Producción Personal',
                    'Equipo de Protección Personal',
                    'Equipo de Primeros auxilios Personal',
                    'Equipo de Prevención de Peligros'
                ],
                answer: 'Equipo de Protección Personal'
            }
        },
        {
            title: 'Módulo 5: Buenas Prácticas',
            summary: 'Para un picking eficiente, es clave seguir las rutas optimizadas, minimizar los errores verificando dos veces los productos y mantener el área de trabajo ordenada. El control de calidad asegura que los clientes reciban exactamente lo que pidieron.',
            quiz: {
                question: '¿Cuál de las siguientes es una buena práctica en el picking?',
                options: [
                    'Tomar atajos no autorizados',
                    'Verificar dos veces los productos',
                    'Dejar el embalaje en el suelo',
                    'Ignorar la lista de picking'
                ],
                answer: 'Verificar dos veces los productos'
            }
        }
    ];

    let currentModuleIndex = 0;

    function loadModule(index) {
        const module = modules[index];
        courseContent.innerHTML = `
            <div class="module">
                <h2>${module.title}</h2>
                <p>${module.summary}</p>
                <div class="quiz-container">
                    <p class="question">${module.quiz.question}</p>
                    <div class="options">
                        ${module.quiz.options.map(option => `
                            <label>
                                <input type="radio" name="quiz" value="${option}"> ${option}
                            </label>
                        `).join('')}
                    </div>
                    <button id="check-answer-btn">Comprobar</button>
                    <div class="feedback"></div>
                </div>
            </div>
        `;

        document.getElementById('check-answer-btn').addEventListener('click', checkAnswer);
    }

    function checkAnswer() {
        const selectedOption = document.querySelector('input[name="quiz"]:checked');
        const feedback = document.querySelector('.feedback');
        if (!selectedOption) {
            feedback.textContent = 'Por favor, selecciona una respuesta.';
            feedback.className = 'feedback incorrect';
            return;
        }

        const answer = selectedOption.value;
        const correctAnswer = modules[currentModuleIndex].quiz.answer;

        if (answer === correctAnswer) {
            feedback.textContent = '¡Correcto!';
            feedback.className = 'feedback correct';
            updateProgress();
            nextBtn.style.display = 'block';
            document.getElementById('check-answer-btn').disabled = true;
        } else {
            feedback.textContent = `Incorrecto. La respuesta correcta es: ${correctAnswer}`;
            feedback.className = 'feedback incorrect';
        }
    }

    function updateProgress() {
        const progress = ((currentModuleIndex + 1) / modules.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    nextBtn.addEventListener('click', () => {
        currentModuleIndex++;
        if (currentModuleIndex < modules.length) {
            loadModule(currentModuleIndex);
            nextBtn.style.display = 'none';
        } else {
            courseContent.innerHTML = '<h2>¡Felicidades, has completado el curso!</h2>';
            nextBtn.style.display = 'none';
        }
    });

    loadModule(currentModuleIndex);
});
