const productList = document.querySelector('#products');
const addProductForm = document.querySelector('#add-product-form');

// Input fields for updating a product
const updateProductForm = document.createElement('form');
updateProductForm.id = 'update-product-form';
updateProductForm.innerHTML = `
  <h2>Update Product</h2>
  <label for="update-id">ID:</label>
  <input type="text" id="update-id" name="update-id" readonly>
  <label for="update-name">Name:</label>
  <input type="text" id="update-name" name="update-name" required>
  <label for="update-price">Price:</label>
  <input type="number" id="upda\te-price" name="update-price" required step="0.01">
  <button type="submit">Update</button>
`;
document.body.appendChild(updateProductForm);

// Event listener for updating a product
updateProductForm.addEventListener('submit', async event => {
  event.preventDefault();
  const id = updateProductForm.elements['update-id'].value;
  const name = updateProductForm.elements['update-name'].value;
  const price = updateProductForm.elements['update-price'].value;
  await updateProduct(id, name, price);
  updateProductForm.reset();
  await fetchProducts();
});

// Function to fetch a single product by ID
async function fetchProductById(id) {
  try {
    const response = await fetch('http://54.159.179.84:3000/products/' + id);
    if (response.ok) {
      const product = await response.json();
      alert(`Product: ${product.name} - $${product.price}`);
    } else {
      alert('Product not found.');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    alert('An error occurred while fetching the product.');
  }
}

// Function to update a product
async function updateProduct(id, name, price) {
  try {
    const response = await fetch('http://54.159.179.84:3000/products/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price })
    });
    if (response.ok) {
      alert('Product updated successfully.');
    } else {
      alert('Failed to update product.');
    }
  } catch (error) {
    console.error('Error updating product:', error);
    alert('An error occurred while updating the product.');
  }
}