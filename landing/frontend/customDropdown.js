const dropdownIcon = () => {
  const dropdownContainer = document.createElement('span');
  dropdownContainer.innerHTML = `<svg width="14px" height="7px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Delivery" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="Transactions-(Landing)" transform="translate(-1360.000000, -29.000000)" fill="#CDCFD3" fill-rule="nonzero">
        <g id="Group-4" transform="translate(1360.000000, 29.000000)">
            <polygon id="Shape" points="0 0 5 5 10 0"></polygon>
        </g>
    </g>
    </g>
</svg>`;
  return dropdownContainer;
}

const categories = [{
  id: 1,
  name: 'Restaurant and Cloud Kitchen'
},
{
  id: 2,
  name: 'Grocery, Fruits and Vegetables'
},
{
  id: 3,
  name: 'Meat and Seafood'
},
{
  id: 4,
  name: 'Fashion, Beauty and Decor'
},
{
  id: 5,
  name: 'Miscellaneous'
},
  // {
  //   id: 6,
  //   name: 'Electronics & Home Appliances'
  // },
  // {
  //   id: 7,
  //   name: 'Jewellery & Accessories'
  // },
  // {
  //   id: 8,
  //   name: 'Mobile & Accessories'
  // },
  // {
  //   id: 9,
  //   name: 'Restaurant & Food Joints'
  // },
  // {
  //   id: 10,
  //   name: 'Supermarket'
  // },
  // {
  //   id: 11,
  //   name: 'Others'
  // }
]

const printArea = document.querySelector("#restaurant-category"),
  buisnessEnquiryDiv = document.querySelector("#buisness-enquiry");

const dropdown = () => {
  const component = document.createElement("div");

  const input = createInput(), errorField = createErrorField(), dropdown = showDropdown();
  component.classList = "dropdown-parent";
  component.appendChild(input);
  component.appendChild(dropdown);
  component.appendChild(errorField);
  printArea.appendChild(component);
};

const createErrorField = () => {
  const errorEle = document.createElement("div");
  errorEle.setAttribute("id", "restaurantCat-error");
  errorEle.classList = "error";
  return errorEle;
}

const createInput = () => {
  // Creates the input outline
  const input = document.createElement("div");
  input.classList = "dropdown-input";
  input.addEventListener("click", toggleDropdown);

  // Creates the input placeholder content
  const inputPlaceholder = document.createElement("div");
  inputPlaceholder.classList = "dd-input__placeholder";

  const placeholder = document.createElement("p");
  placeholder.textContent = "Select business category";
  placeholder.classList.add('dd-placeholder')

  // Appends the placeholder and chevron (stored in assets.js)
  inputPlaceholder.appendChild(placeholder);
  inputPlaceholder.appendChild(dropdownIcon());
  input.appendChild(inputPlaceholder);

  return input;
};

const showDropdown = () => {
  const structure = document.createElement("div");
  structure.classList.add("dd-structure", "hide");

  categories.forEach(category => {
    const { id, name } = category;
    const option = document.createElement("div");
    option.addEventListener("click", () => selectOption(name));
    option.setAttribute("id", id);

    const n = document.createElement("h5");
    n.textContent = name;

    option.appendChild(n);
    structure.appendChild(option);
  });
  return structure;
};

const toggleDropdown = () => {
  const dropdown = document.querySelector(".dd-structure");
  dropdown.classList.toggle("hide");

  const input = document.querySelector(".dropdown-input");
  input.classList.toggle("dd-input__active");
};

const selectOption = (name) => {
  const text = document.querySelector('.dd-placeholder');
  var restaurantCatError = document.getElementById("restaurantCat-error");
  restaurantCatError.innerText = "";
  text.textContent = name;
  text.classList.add('dd-input__selected')
  toggleDropdown();
};

const createBuisnessQueryElement = () => {
  var ele = document.createElement("div");
  ele.textContent = "For New Business inquiries - +91 - 8068175626 (10 am to 8 pm). For support - help@dotpe.in";
  console.log(renderArea, "-----------")
  renderArea.appendChild(ele);
}

dropdown();
createBuisnessQueryElement();