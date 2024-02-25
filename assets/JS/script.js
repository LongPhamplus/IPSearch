const closeNormalBtn = document.querySelector('.search-bar-advanced__btn')
const norSearchBar = document.querySelector('.search-bar--normal')
const advSearchBar = document.querySelector('.advsearch-container')
const openAdvanceBtn = document.querySelector('.advanced-search__btn')
function closeNorSearch()
{
    closeNormalBtn.classList.add('close')
    norSearchBar.classList.add('min-width-776')
    advSearchBar.classList.remove('close')
}
openAdvanceBtn.addEventListener('click', closeNorSearch)

function redirect()
{
    window.location = './searchPage.html'
}