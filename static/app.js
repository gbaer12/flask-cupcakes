const BASE_URL = 'http://localhost:5000/api';


// Create HTML for each cupcake
function generateCupcakeHTML(cupcake) {
    return `
    <div data-cupcake-id=${cupcake.id}>
        <li>
            ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button class="delete-button">X</button>
        </li>
        <img class="cupcake-img" src="${cupcake.image}" alt="(no image provided)">
    </div>
    `;
}

//Show cupcakes on homepage
async function showInitialCupcakes() {
    const res = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcakeData of res.data.cupcakes) {
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $('#cupcake-list').append(newCupcake);
    }
}