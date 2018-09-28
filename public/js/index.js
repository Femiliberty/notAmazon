const addSizeBtn = document.getElementById('add-size-btn');
const sizesUl = document.getElementById('sizes-ul');

addSizeBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('add size btn')
  let li = document.createElement('li');
  let sizeInput = document.createElement('input');
  let qtyInput = document.createElement('input');

  sizeInput.name = `sizes[${sizesUl.children.length}][size]`;
  qtyInput.name = `sizes[${sizesUl.children.length}][qty]`;
  
  sizeInput.placeholder = 'Size';
  qtyInput.placeholder = 'Qty';

  li.appendChild(sizeInput);
  li.appendChild(qtyInput);
  sizesUl.appendChild(li);

});

function toggleMenu() {

  document.getElementById('navMenu').classList.toggle('active');
  document.getElementById('navMenu').classList.toggle('animated');
  document.getElementById('navMenu').classList.toggle('jello');

}