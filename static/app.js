const BASE_URL = 'http://127.0.0.1:5000/api';

// Create HTML for each cupcake
function generateCupcakeHTML(cupcake) {
    return `
        <div data-cupcake-id=${cupcake.id}>
            <p>
                ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
                <button class="delete-button">X</button>
            </p>
            <img class="cupcake-img" src="${cupcake.image}" alt="(no image provided)">
        </div>
    `;
}

//Show cupcakes on homepage
async function showInitialCupcakes() {
    const res = await axios.get(`${BASE_URL}/cupcakes`);

    // console.log(res.data.cupcakes);

    for (let cupcakeData of res.data.cupcakes) {
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $('#cupcakes-list').append(newCupcake);
    }
}

// handle form for adding a new cupcake
$('#new-cupcake-form').on('submit', async function(e){
    e.preventDefault();
    let flavor = $('#form-flavor').val();
    let rating = $('#form-rating').val();
    let size = $('#form-size').val();
    let image = $('#form-image').val();

    const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });

    let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
    $('#cupcakes-list').append(newCupcake);
    $('#new-cupcake-form').trigger('reset');
});

//handle delete cupcake button
$('#cupcakes-list').on('click', '.delete-button', async function (e){
    e.preventDefault();
    let $cupcake = $(e.target).closest('div');
    let cupcakeId = $cupcake.attr('data-cupcake-id');

    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

$(showInitialCupcakes);