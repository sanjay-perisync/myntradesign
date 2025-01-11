document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('mycard');
  const categoryCheckboxes = document.querySelectorAll('input[name^="Tshirts"], input[name^="Shirts"], input[name^="Jeans"], input[name^="Trousers"], input[name^="Sweatshirts"], input[name^="Jackets"], input[name^="Kurta"], input[name^="Saree"]');
  const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
  const colorCheckboxes = document.querySelectorAll('input[name="color"]');
  const discountRadios = document.querySelectorAll('input[name="discount"]');
  const genderRadioButtons = document.querySelectorAll('input[name="gender"]');
  const searchBar = document.getElementById('search-bar'); 

  
  function fetchAndDisplayProducts(selectedGender = null, searchQuery = '') {
    fetch('./products.json')
      .then(response => response.json())
      .then(data => {
        // Apply filters based on selected categories, brands, colors, discounts, gender, and search 
        const selectedCategories = [];
        const selectedBrands = [];
        const selectedColors = [];
        let selectedDiscount = null;

        // Get selected categories
        categoryCheckboxes.forEach(checkbox => {
          if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
          }
        });

        // Get selected brands
        brandCheckboxes.forEach(checkbox => {
          if (checkbox.checked) {
            selectedBrands.push(checkbox.value);
          }
        });

        // Get selected colors
        colorCheckboxes.forEach(checkbox => {
          if (checkbox.checked) {
            selectedColors.push(checkbox.value);
          }
        });

        // Get selected discount
        discountRadios.forEach(radio => {
          if (radio.checked) {
            selectedDiscount = parseInt(radio.value);
          }
        });

        // Filter products based on selected criteria
        const filteredProducts = data.filter(item => {
          const discountAmount = item.discount || 0;
          const matchesGender = selectedGender ? item.gender === selectedGender : true;
          const matchesSearch = (
            item.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
          );

          return (
            matchesGender &&
            (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
            (selectedBrands.length === 0 || selectedBrands.includes(item.brand)) &&
            (selectedColors.length === 0 || selectedColors.includes(item.color)) &&
            (selectedDiscount === null || discountAmount >= selectedDiscount) &&
            matchesSearch 
          );
        });

       
        const cardsHTML = filteredProducts.map(item => {
          return `
         <!-- card -->
<div class="flex items-center hover:shadow-lg lg:items-start flex-col gap-2 p-2">
  <!-- card top -->
  <div class="flex flex-col items-center gap-2 p-2">
    <div>
      <img src="${item.image}" alt="${item.brand} ${item.category} Product" class="object-fill">
    </div>
  </div>
  <!-- card bottom -->
  <div class="sm:pl-4">
    <div>
      <p class="text-lg font-semibold">${item.brand}</p>
    </div>
    <div>
      <p class="text-sm text-gray-600">${item.category}</p>
    </div>
    <div class="flex gap-2 items-center">
      <div>
        <p class="text-md font-bold">${item.price}</p>
      </div>
      <div class="text-md text-orange-400">
        <p class="font-md">(${item.discount}% OFF)</p> 
      </div>
    </div>
  </div>
</div>
<!-- card ends -->

          `;
        }).join('');

        container.innerHTML = cardsHTML;
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

 
  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => fetchAndDisplayProducts());
  });

  
  brandCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => fetchAndDisplayProducts());
  });

 
  colorCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => fetchAndDisplayProducts());
  });

  
  discountRadios.forEach(radio => {
    radio.addEventListener('change', () => fetchAndDisplayProducts());
  });

  
  genderRadioButtons.forEach(radio => {
    radio.addEventListener('change', event => {
      const selectedGender = event.target.value;
      fetchAndDisplayProducts(selectedGender);
    });
  });

  // search bar to filter 
  searchBar.addEventListener('input', () => {
    const searchQuery = searchBar.value;
    fetchAndDisplayProducts(null, searchQuery); 
  });

  
  fetchAndDisplayProducts(); 
});

  



  // Price slider
  const priceRange = document.getElementById("priceRange");
  const maxPriceLabel = document.getElementById("maxPrice");

  
  priceRange.addEventListener("input", () => {
      const maxPrice = parseInt(priceRange.value, 10);
      maxPriceLabel.textContent = `₹${maxPrice}+`;
  });



  




