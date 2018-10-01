const addSizeBtn = document.getElementById('add-size-btn');
const sizesUl = document.getElementById('sizes-ul');

addSizeBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('add size btn')
  let inputGroupDiv = document.createElement('div');
  let inputGroupDiv2 = document.createElement('div');
  let inputGroupPrependDiv = document.createElement('div');
  let inputGroupPrependDiv2 = document.createElement('div');
  let sizeSpan = document.createElement('span');
  let qtySpan = document.createElement('span');
  let li = document.createElement('li');
  let sizeInput = document.createElement('input');
  let qtyInput = document.createElement('input');

  sizeInput.classList = 'form-control';
  qtyInput.classList = 'form-control';
  inputGroupDiv.classList = "input-group mb-3 row-3";
  inputGroupDiv2.classList = "input-group mb-3 row-3";
  inputGroupPrependDiv.classList = "input-group-prepend";
  inputGroupPrependDiv2.classList = "input-group-prepend";
  sizeSpan.classList = "input-group-text";
  qtySpan.classList = "input-group-text";

  sizeSpan.innerHTML = 'Size';
  qtySpan.innerHTML = 'Qty';

  sizeInput.name = `sizes[${sizesUl.children.length}][size]`;
  qtyInput.name = `sizes[${sizesUl.children.length}][qty]`;
  
  sizeInput.placeholder = 'Size';
  qtyInput.placeholder = 'Qty';

  inputGroupPrependDiv.appendChild(sizeSpan);
  inputGroupDiv.appendChild(inputGroupPrependDiv);
  inputGroupDiv.appendChild(sizeInput)
  li.appendChild(inputGroupDiv);

  inputGroupPrependDiv2.appendChild(qtySpan);
  inputGroupDiv2.appendChild(inputGroupPrependDiv2);
  inputGroupDiv2.appendChild(qtyInput)
  li.appendChild(inputGroupDiv2);

  // li.appendChild(sizeInput);
  // li.appendChild(qtyInput);
  sizesUl.appendChild(li);

});

function toggleMenu() {

  document.getElementById('navMenu').classList.toggle('active');
  document.getElementById('navMenu').classList.toggle('animated');
  document.getElementById('navMenu').classList.toggle('jello');

}