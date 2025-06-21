document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const getPredictionBtn = document.getElementById('getPredictionBtn');
    const resetBtn = document.getElementById('resetBtn');
    const predictionResultDiv = document.getElementById('predictionResult');
    const userQuestionInput = document.getElementById('userQuestion'); // 질문 입력 필드
    let selectedCards = [];

    const tarotCards = {
        'card1': { name: '현자 (The Sage)', meaning: '지혜, 경험, 내면의 안내자', detail: '당신은 오늘 중요한 결정을 내릴 때 내면의 지혜를 따르세요. 오랜 경험이 있는 이의 조언을 듣는 것도 좋습니다.' },
        'card2': { name: '별 (The Star)', meaning: '희망, 영감, 치유', detail: '밝은 미래가 당신을 기다립니다. 긍정적인 마음으로 나아가세요. 당신의 꿈이 이루어질 가능성이 높습니다.' },
        'card3': { name: '운명의 수레바퀴 (Wheel of Fortune)', meaning: '변화, 운명, 전환점', detail: '인생의 새로운 국면이 시작될 수 있습니다. 긍정적인 변화를 받아들이고, 기회를 놓치지 마세요.' },
        'card4': { name: '힘 (Strength)', meaning: '용기, 인내, 통제', detail: '당신 안의 강한 힘과 용기를 발휘할 때입니다. 어려움에 직면하더라도 침착하게 인내심을 가지면 극복할 수 있습니다.' },
        'card5': { name: '연인 (The Lovers)', meaning: '선택, 관계, 조화', detail: '중요한 선택의 기로에 설 수 있습니다. 인간관계에서의 조화와 소통이 중요하며, 사랑과 이해가 깊어질 수 있습니다.' },
        'card6': { name: '마법사 (The Magician)', meaning: '창조, 능력, 시작', detail: '새로운 시작을 위한 모든 재능과 도구가 당신에게 있습니다. 아이디어를 현실로 만들 좋은 시기입니다.' },
        'card7': { name: '정의 (Justice)', meaning: '공정함, 균형, 진실', detail: '공정하고 정의로운 판단이 필요한 시기입니다. 모든 상황을 객관적으로 보고 균형을 맞추려고 노력하세요.' },
        'card8': { name: '태양 (The Sun)', meaning: '성공, 행복, 활력', detail: '가장 긍정적인 카드 중 하나입니다. 성공과 행복이 따를 것이며, 활력이 넘치는 하루 또는 시기가 될 것입니다.' }
    };

    getPredictionBtn.disabled = true;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('selected')) {
                card.classList.remove('selected');
                selectedCards = selectedCards.filter(item => item !== card.dataset.card);
            } else {
                if (selectedCards.length < 3) {
                    card.classList.add('selected');
                    selectedCards.push(card.dataset.card);
                } else {
                    alert('세 장의 카드만 선택할 수 있습니다.');
                }
            }
            getPredictionBtn.disabled = selectedCards.length !== 3;
        });
    });

    getPredictionBtn.addEventListener('click', () => {
        if (selectedCards.length === 3) {
            displayPrediction();
        } else {
            alert('세 장의 카드를 선택해주세요.');
        }
    });

    resetBtn.addEventListener('click', () => {
        resetGame();
    });

    function displayPrediction() {
        const userQuestion = userQuestionInput.value.trim(); // 사용자가 입력한 질문 가져오기
        let predictionHtml = '<h2>당신의 예언 결과:</h2>';

        if (userQuestion) {
            predictionHtml += `<p><strong>질문:</strong> ${userQuestion}</p><hr>`;
        } else {
            predictionHtml += `<p><strong>(질문 없이 카드를 뽑으셨습니다.)</strong></p><hr>`;
        }
        
        selectedCards.forEach((cardKey, index) => {
            const cardData = tarotCards[cardKey];
            if (cardData) {
                let positionMeaning = '';
                if (index === 0) {
                    positionMeaning = '현재 당신의 상황 또는 질문의 핵심:';
                } else if (index === 1) {
                    positionMeaning = '도전 과제 또는 고려해야 할 점:';
                } else if (index === 2) {
                    positionMeaning = '조언 또는 예상되는 결과:';
                }

                predictionHtml += `
                    <div class="card-prediction">
                        <h3>${index + 1}. ${cardData.name}</h3>
                        <p><strong>${positionMeaning}</strong></p>
                        <p>${cardData.detail}</p>
                    </div>
                    <hr>
                `;
            }
        });
        predictionResultDiv.innerHTML = predictionHtml;
        predictionResultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function resetGame() {
        cards.forEach(card => {
            card.classList.remove('selected');
        });
        selectedCards = [];
        getPredictionBtn.disabled = true;
        predictionResultDiv.innerHTML = '';
        userQuestionInput.value = ''; // 질문 입력 필드 초기화
    }
});