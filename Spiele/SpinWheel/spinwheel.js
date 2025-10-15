// script.js
document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.querySelector('.wheel');
    const spinButton = document.getElementById('spin-button');
    const resultDisplay = document.getElementById('result'); 

    const segmentDegree = 45;
    const SPIN_DURATION = 8;
    const EXTRA_SPINS = 10;
    
    // Offset damit der Zeiger nicht genau auf der Kante landet
    const POINTER_OFFSET = 15;
    
    const segments = [
        { number: 1, prize: '100 Coins', isWin: true },
        { number: 2, prize: 'Niete', isWin: false },
        { number: 3, prize: '500 Coins', isWin: true },
        { number: 4, prize: 'Niete', isWin: false },
        { number: 5, prize: '1000 Coins', isWin: true },
        { number: 6, prize: 'Niete', isWin: false },
        { number: 7, prize: '10 Coins', isWin: true },
        { number: 8, prize: 'Niete', isWin: false }
    ];

    spinButton.addEventListener('click', () => {
        spinButton.disabled = true;
        resultDisplay.textContent = 'Das Rad dreht sich...'; 

        // Zufälliges Segment auswählen
        const targetSegment = Math.floor(Math.random() * 8) + 1;
        
        // Winkelberechnung mit Offset
        const baseAngle = (targetSegment - 1) * segmentDegree + POINTER_OFFSET;
        const randomization = (Math.random() * 20) - 10;
        const targetDegree = (360 * EXTRA_SPINS) + baseAngle + randomization;

        // Reset und Drehung
        wheel.style.transition = 'none';
        wheel.style.transform = 'rotate(0deg)';
        wheel.offsetHeight;
        wheel.style.transition = `transform ease-out ${SPIN_DURATION}s`;
        wheel.style.transform = `rotate(-${targetDegree}deg)`;

        setTimeout(() => {
            // Das tatsächliche Gewinnsegment basierend auf dem Endwinkel berechnen
            const actualWinningSegment = calculateWinningSegment(targetDegree);
            const winningSegment = segments[actualWinningSegment - 1];
            
            if (winningSegment.isWin) {
                resultDisplay.textContent = `🎉 HERZLICHEN GLÜCKWUNSCH! Du hast ${winningSegment.prize} gewonnen! 🎉`;
            } else {
                resultDisplay.textContent = `😕 Leider eine ${winningSegment.prize}. Versuch es nochmal! 😕`;
            }
            
            spinButton.disabled = false;
            wheel.style.transition = 'none';
        }, SPIN_DURATION * 1000);
    });

    // Funktion zur Berechnung des tatsächlichen Gewinnsegments
    function calculateWinningSegment(totalDegrees) {
        // totalDegrees ist der absolute Rotationswinkel, den wir dem Rad gegeben haben.
        // Wir interessieren uns für die Position relativ zum Zeiger (top).
        // 1) Ermittle den Endwinkel innerhalb einer Umdrehung
        const endDegree = totalDegrees % 360;

        // 2) Da wir das Rad mit negativer Rotation drehen (wheel.style.transform = `rotate(-${targetDegree}deg)`),
        //    entspricht ein endDegree von X einer visuellen Rotation von -X Grad.
        //    Um den Winkel auf dem Rad zu finden, den der Zeiger trifft (0° oben),
        //    müssen wir diesen invertieren.
        const visualDegree = (360 - endDegree) % 360;

        // 3) Jetzt berücksichtigt man den POINTER_OFFSET: der Zeiger ist nicht exakt auf 0°,
        //    sondern wir haben beim Berechnen des Zielwinkels einen Offset benutzt.
        //    Um das Ergebnis konsistent zu machen, ziehen wir den Pointer-Offset ab.
        const adjustedDegree = (visualDegree - POINTER_OFFSET + 360) % 360;

        // 4) Berechne das Segment: jedes Segment hat eine Breite von segmentDegree Grad.
        //    Wir nehmen das Segment, in das der angepasste Winkel fällt.
        let index = Math.floor(adjustedDegree / segmentDegree); // 0..7

        // 5) Mappe index (0..7) auf Segmentnummer (1..8)
        const segmentNumber = (index % 8) + 1;

        // Debugging-Info (kann in DevTools geprüft werden)
        console.log('calculateWinningSegment:', { totalDegrees, endDegree, visualDegree, adjustedDegree, index, segmentNumber });

        return segmentNumber;
    }
});