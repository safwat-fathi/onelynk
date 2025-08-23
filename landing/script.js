document.addEventListener('DOMContentLoaded', () => {
    // Handle form submissions
    const notifyBtn = document.getElementById('notify-btn');
    const joinBtn = document.getElementById('join-btn');
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    if (notifyBtn) {
        notifyBtn.addEventListener('click', handleEmailSubmit);
    }
    
    if (joinBtn) {
        joinBtn.addEventListener('click', handleEmailSubmit);
    }
    
    // Add event listeners to all email inputs for Enter key
    emailInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleEmailSubmit();
            }
        });
    });
    
    function handleEmailSubmit() {
        const email = document.getElementById('email-input')?.value || 
                     document.getElementById('email-input-2')?.value;
        
        if (email && validateEmail(email)) {
            // In a real implementation, you would send this to your backend
            alert(`Thank you! We'll notify you at ${email} when Zeelink launches.`);
            // Reset form
            document.getElementById('email-input').value = '';
            document.getElementById('email-input-2').value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Add animation to orbit items on hover
    const orbitItems = document.querySelectorAll('.orbit-item');
    
    orbitItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'translateX(-50%) scale(1.1)';
            item.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
        });
        
        item.addEventListener('mouseout', () => {
            item.style.transform = 'translateX(-50%) scale(1)';
            item.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
    });
});