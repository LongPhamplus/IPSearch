document.addEventListener('DOMContentLoaded', function() {
    const closeNormalBtn = document.querySelector('.search-bar-advanced__btn');
    const norSearchBar = document.querySelector('.search-bar--normal');
    const advSearchBar = document.querySelector('.advsearch-container');
    const openAdvanceBtn = document.querySelector('.advanced-search__btn');
    const closeIndemnityBtn = document.querySelector('.indemnity-remove')
    const indemnityContainer = document.querySelector('.indemnity-container')
    const openIndemnityBtn = document.querySelector('.declare')
    const advancedSeachAnimation = document.querySelector('.search-bar')
    const searchTitle = document.querySelector('.search-title')

    // Bật và tắt hộp miễn trừ trách nhiệm
    openIndemnityBtn.addEventListener('click', (event) => {
        event.preventDefault()
        indemnityContainer.classList.remove('close')
    })
    closeIndemnityBtn.addEventListener('click', () => {
        indemnityContainer.classList.add('close')
    })
    // Ấn ra ngoài để tắt miễn trừ tn
    indemnityContainer.addEventListener('click', (event) => {
        if (event.target !== indemnityContainer) {
            console.log(event.target)
            return
        }
        indemnityContainer.classList.add('close')
    })
    
    
    // Gán sự kiện cho nút submit
    // Hàm xử lý khi nút mở tìm kiếm nâng cao được click
    function closeNorSearch() {
        closeNormalBtn.classList.add('close');
        norSearchBar.classList.add('min-width-776');
        advSearchBar.classList.remove('close');
        advancedSeachAnimation.classList.add('advanced-search-animation');
        searchTitle.classList.add('open')
        searchTitle.classList.remove('close')
    }

    // Bật hộp miễn trừ trách nhiệm
    

    openAdvanceBtn.addEventListener('click', function(event) {
        event.preventDefault()
    })
    // Gán sự kiện cho nút mở tìm kiếm nâng cao
    openAdvanceBtn.addEventListener('click', function() {
        closeNorSearch(); // Gọi hàm xử lý khi nút được click
    });

});