/**
 * NEAR - Never Empty Again on Return
 * Form Validation JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            resetFormErrors();
            
            // Validate form fields
            const isValid = validateForm();
            
            if (isValid) {
                // Simulate form submission
                simulateFormSubmission();
            }
        });
        
        // Real-time validation as user types
        const formFields = contactForm.querySelectorAll('input, textarea, select');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
    
    // Main form validation function
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const type = document.getElementById('type');
        const message = document.getElementById('message');
        
        // Name validation
        if (!name.value.trim()) {
            showError(name, 'Por favor, ingresa tu nombre');
            isValid = false;
        }
        
        // Email validation
        if (!email.value.trim()) {
            showError(email, 'Por favor, ingresa tu email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Por favor, ingresa un email válido');
            isValid = false;
        }
        
        // Type validation
        if (!type.value) {
            showError(type, 'Por favor, selecciona una opción');
            isValid = false;
        }
        
        // Message validation
        if (!message.value.trim()) {
            showError(message, 'Por favor, ingresa un mensaje');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Individual field validation
    function validateField(field) {
        if (field.id === 'name') {
            if (!field.value.trim()) {
                showError(field, 'Por favor, ingresa tu nombre');
                return false;
            }
        } 
        else if (field.id === 'email') {
            if (!field.value.trim()) {
                showError(field, 'Por favor, ingresa tu email');
                return false;
            } else if (!isValidEmail(field.value)) {
                showError(field, 'Por favor, ingresa un email válido');
                return false;
            }
        } 
        else if (field.id === 'type') {
            if (!field.value) {
                showError(field, 'Por favor, selecciona una opción');
                return false;
            }
        } 
        else if (field.id === 'message') {
            if (!field.value.trim()) {
                showError(field, 'Por favor, ingresa un mensaje');
                return false;
            }
        }
        
        // If we get here, the field is valid
        clearError(field);
        return true;
    }
    
    // Email validation regex
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Show error message
    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }
    
    // Clear error message
    function clearError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = '';
        }
    }
    
    // Reset all form errors
    function resetFormErrors() {
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.textContent = '';
            }
        });
        
        // Hide success message if visible
        if (formSuccess) {
            formSuccess.classList.remove('active');
        }
    }
    
    // Simulate form submission (in a real app, this would be an AJAX call)
    function simulateFormSubmission() {
        // Disable form controls
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formFields = contactForm.querySelectorAll('input, textarea, select');
        
        submitButton.disabled = true;
        formFields.forEach(field => field.disabled = true);
        
        // Show loading state on button
        const originalButtonText = submitButton.textContent;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Simulate server delay
        setTimeout(() => {
            // Show success message
            if (formSuccess) {
                formSuccess.classList.add('active');
            }
            
            // Reset form
            contactForm.reset();
            
            // Restore button
            submitButton.innerHTML = originalButtonText;
            
            // Re-enable form controls after a delay
            setTimeout(() => {
                submitButton.disabled = false;
                formFields.forEach(field => field.disabled = false);
                
                // Hide success message after a few seconds
                setTimeout(() => {
                    if (formSuccess) {
                        formSuccess.classList.remove('active');
                    }
                }, 5000);
            }, 500);
        }, 1500);
    }
});
