// Sistem Komentar untuk Blog
document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    
    if (commentForm) {
        // Validasi form komentar
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('commentName').value.trim();
            const email = document.getElementById('commentEmail').value.trim();
            const comment = document.getElementById('commentText').value.trim();
            
            if (validateCommentForm(name, email, comment)) {
                submitComment(name, email, comment);
            }
        });
        
        function validateCommentForm(name, email, comment) {
            let isValid = true;
            
            // Reset error messages
            document.querySelectorAll('.invalid-feedback').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
            });
            
            // Validate name
            if (name === '') {
                document.getElementById('nameError').style.display = 'block';
                document.getElementById('commentName').classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '' || !emailRegex.test(email)) {
                document.getElementById('emailError').style.display = 'block';
                document.getElementById('commentEmail').classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate comment
            if (comment === '') {
                document.getElementById('commentError').style.display = 'block';
                document.getElementById('commentText').classList.add('is-invalid');
                isValid = false;
            }
            
            return isValid;
        }
        
        function submitComment(name, email, comment) {
            const submitBtn = document.getElementById('commentSubmit');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Create new comment element
                const commentsContainer = document.getElementById('commentsContainer');
                const newComment = createCommentElement(name, comment);
                
                // Add new comment to the top
                commentsContainer.insertBefore(newComment, commentsContainer.firstChild);
                
                // Update comments count
                updateCommentsCount();
                
                // Reset form
                commentForm.reset();
                
                // Show success message
                showSuccessMessage();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
        
        function createCommentElement(name, comment) {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.innerHTML = `
                <div class="comment-header">
                    <strong>${name}</strong>
                    <span class="comment-date">Baru saja</span>
                </div>
                <div class="comment-body">
                    <p>${comment}</p>
                </div>
                <div class="comment-actions">
                    <button class="btn btn-sm btn-outline-primary">Suka</button>
                    <button class="btn btn-sm btn-outline-secondary">Balas</button>
                </div>
            `;
            return commentDiv;
        }
        
        function updateCommentsCount() {
            const countElement = document.getElementById('commentsCount');
            if (countElement) {
                const currentCount = parseInt(countElement.textContent) || 0;
                countElement.textContent = currentCount + 1;
            }
        }
        
        function showSuccessMessage() {
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
            successAlert.innerHTML = `
                Komentar berhasil dikirim! Terima kasih atas kontribusi Anda.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            commentForm.parentNode.insertBefore(successAlert, commentForm.nextSibling);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (successAlert.parentNode) {
                    successAlert.remove();
                }
            }, 5000);
        }
    }
    
    // Comment interaction
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            const comment = e.target.closest('.comment');
            const replyForm = createReplyForm();
            comment.appendChild(replyForm);
        }
    });
    
    function createReplyForm() {
        const form = document.createElement('div');
        form.className = 'reply-form mt-3';
        form.innerHTML = `
            <form class="comment-form">
                <div class="mb-3">
                    <textarea class="form-control" placeholder="Tulis balasan..." rows="3" required></textarea>
                </div>
                <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-primary btn-sm">Kirim Balasan</button>
                    <button type="button" class="btn btn-secondary btn-sm cancel-reply">Batal</button>
                </div>
            </form>
        `;
        
        // Add event listeners
        const cancelBtn = form.querySelector('.cancel-reply');
        cancelBtn.addEventListener('click', function() {
            form.remove();
        });
        
        const replyForm = form.querySelector('.comment-form');
        replyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle reply submission
            form.remove();
        });
        
        return form;
    }
});
