$(document).ready(function () {

    function selectDatapelanggan() {
        $.ajax({
            type: "get",
            url: "http://localhost/tugas/php/select.php",
            dataType: "json",
            success: function (response) {
                let isi = `<h5>Pelanggan:</h5>
                            <tr>
                            <th>No</th>
                            <th>Pelanggan</th>
                            <th>Alamat</th>
                            <th>Telp</th>
                            <th>Hapus</th>
                            <th>Ubah</th>
                            <th>Cart</th>
                            </tr>`;
                
                let no = 1;

                $.each(response, function (key, val) { 
                    isi += `<tr>
                            <td>${no++}</td>
                            <td id="pelanggann">${val.pelanggan}</td>
                            <td id="alamatt">${val.alamat}</td>
                            <td id="telepun">${val.telp}</td>
                            <td><button type="button" class="btn btn-danger btn-del" data-id=${val.idpelanggan}>DEL</button></td>
                            <td><button type="button" id="btn-tambah" class="btn btn-warning btn-ubah" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=${val.idpelanggan}>UBAH</button></td>
                            <td><button type="button" class="btn btn-success btn-cart" id="idpelanggann" data-id=${val.idpelanggan}>CART</button></td>
                            </tr>`;
                });

                $("#satutiga").html(isi);
            }
        });
    }

    $("#panggil").click(function (e) { 
        e.preventDefault();
        selectDatapelanggan();
    });


    //------------------------------------------------------------------------------------------------------------------------------


    $("tbody").on("click", ".btn-cart", function () {
        let id = $(this).attr("data-id");
        selectPelangganWhere(id);
    });

    function selectPelangganWhere(id) {

        $.ajax({
            type: "get",
            url: "http://localhost/tugas/php/selectwhere.php?id="+id,
            dataType: "json",
            success: function (response) {

                let output = `  <h5>Pelanggan yang dipilih:</h5>
                                <tr>
                                    <th>Id</th>
                                    <th>Pelanggan</th>
                                    <th>Alamat</th>
                                    <th>Telp</th>
                                </tr>

                                <tr>
                                    <td id="idpelanggann">${response.idpelanggan}</td>
                                    <td id="pelanggann">${response.pelanggan}</td>
                                    <td id="alamatt">${response.alamat}</td>
                                    <td id="telepun">${response.telp}</td>
                                </tr>`;


                $("#satudua").html(output);
            }
        });

        selectDatapelanggan();
    }


    //------------------------------------------------------------------------------------------------------------------------------

    let id = "";
    let pelanggan = "";
    let alamat = "";
    let telp = "";

    $("#submitpelanggan").click(function (e) { 
        e.preventDefault();
        id = $("#id").val();
        pelanggan = $("#pelanggan").val();
        alamat = $("#alamat").val();
        telp = $("#telp").val();

        if (id == "") {
            insertData();
            
        } else {
            updateData();
        }

        $("#id").val("");
        $("#pelanggan").val("");
        $("#alamat").val("");
        $("#telp").val("");

    });

    $("#btn-tambah").click(function (e) { 
        e.preventDefault();
        
        $("#titel").html("<h4>Tambah Data</h4>");

        $("#id").val("");
        $("#pelanggan").val("");
        $("#alamat").val("");
        $("#telp").val("");

    });

    
    $("tbody").on("click", ".btn-ubah", function () {
        let id = $(this).attr("data-id");
        selectUpdate(id);
    });

    $("tbody").on("click", ".btn-ubah", function () {
        $("#titel").html("<h4>Ubah Data</h4>");
        selectUpdate(id);
    });

    function selectUpdate(id) {
        let idpelanggan = {
            idpelanggan : id,
        }

        $.ajax({
            type: "post",
            url: "http://localhost/tugas/php/selectupdate.php",
            cache: false,
            data: JSON.stringify(idpelanggan),
            // dataType: "dataType",
            success: function (response) {
                let data = JSON.parse(response);

                $("#id").val(data.idpelanggan);
                $("#pelanggan").val(data.pelanggan);
                $("#alamat").val(data.alamat);
                $("#telp").val(data.telp);

            }
        });
    }

    //------------------------------------------------------------------------------------------------------------------------------

    function insertData() {
        let datapelanggan = {
            pelanggan : pelanggan,
            alamat : alamat,
            telp : telp
        }

        $.ajax({
            type: "post",
            url: "http://localhost/tugas/php/insert.php",
            cache: false,
            data: JSON.stringify(datapelanggan),
            // dataType: "dataType",
            success: function (response) {
                let out = `<p>${response}</p>`;
                $("#msg").html(out);
                window.location.reload('http://127.0.0.1:5500/');
            }
        });

        selectDatapelanggan();
    }


    //------------------------------------------------------------------------------------------------------------------------------

    function updateData() {
        let datapelanggan = {  
            idpelanggan : id,
            pelanggan : pelanggan,
            alamat : alamat,
            telp : telp
        }

        $.ajax({
            type: "post",
            url: "http://localhost/tugas/php/update.php",
            cache: false,
            data: JSON.stringify(datapelanggan),
            // dataType: "dataType",
            success: function (response) {
                let out = `<p>${response}</p>`;
                $("#msg").html(out);
                window.location.reload('http://127.0.0.1:5500/');
            }
        });

        selectDatapelanggan();
    }



    //------------------------------------------------------------------------------------------------------------------------------


    $("tbody").on("click", ".btn-del", function () {
        let id = $(this).attr("data-id");

        if (confirm("Yakin Akan Menghapus ?")) {
            deleteData(id);
        }
    });

    function deleteData(id) {
        let idpelanggan = {
            idpelanggan : id,
        }

        $.ajax({
            type: "post",
            url: "http://localhost/tugas/php/delete.php",
            cache: false,
            data: JSON.stringify(idpelanggan),
            // dataType: "dataType",
            success: function (response) {
                let out = `<p>${response}</p>`;
                $("#msg").html(out);

                window.location.reload('http://127.0.0.1:5500/');
            }
        });
        selectDatapelanggan();

    }

    //------------------------------------------------------------------------------------------------------------------------------


    function selectDataOrder() {
        $.ajax({
            type: "get",
            url: "http://localhost/tugas/php/selectorder.php",
            dataType: "json",
            success: function (response) {
                let konten = `<h5>Order:</h5>
                            <tr>
                            <th>Id Order</th>
                            <th>Id pelanggan</th>
                            <th>Tanggal Order</th>
                            <th>Total</th>
                            <th>Bayar</th>
                            <th>Kembali</th>
                            <th>Status</th>
                            <th>Hapus</th>
                            <th>Ubah</th>
                            </tr>`;
                
                let no = 1;

                $.each(response, function (key, val) { 
                    konten += `<tr>
                            <td id="idorder">${val.idorder}</td>
                            <td id="idpelanggann">${val.idpelanggan}</td>
                            <td>${val.tglorder}</td>
                            <td>${val.total}</td>
                            <td>${val.bayar}</td>
                            <td>${val.kembali}</td>
                            <td>${val.status}</td>
                            <td><button type="button" class="btn btn-danger btn-deldua" data-id=$(val.idpelanggan)>DEL</button></td>
                            <td><button type="button" class="btn btn-warning btn-ubahsatu" data-id=$(val.idpelanggan)>UBAH</button></td>
                            </tr>`;
                });

                $("tbody").html(konten);
            }
        });
    }
    
    $("#order").click(function (e) { 
        e.preventDefault();
        selectDataOrder();
    });

    //------------------------------------------------------------------------------------------------------------------------------

    function selectDataOrderDetail() {
        $.ajax({
            type: "get",
            url: "http://localhost/tugas/php/selectorderdetail.php",
            dataType: "json",
            success: function (response) {
                let content =`<h5>OrderDetail :</h5>
                            <tr>
                            <th>Id Order Detail</th>
                            <th>Id Order</th>
                            <th>Id Barang</th>
                            <th>Jumlah</th>
                            <th>Harga</th>
                            <th>Barang</th>
                            <th>Id Pelanggan</th>
                            <th>Pelanggan</th>
                            <th>Alamat</th>
                            </tr>`;
                
                let no = 1;

                $.each(response, function (key, val) { 
                    content += `<tr>
                                <td>${no++}</td>
                                <td id="idorder">${val.idorder}</td>
                                <td>${val.id}</td>
                                <td>${val.jumlah}</td>
                                <td>${val.harga}</td>
                                <td>${val.title}</td>
                                <td>${val.id}</td>
                                <td>${val.pelanggann}</td>
                                <td>${val.alamatt}</td>
                                </tr>`;
                });

                // <td><button type="button" class="btn btn-danger btn-deltiga" data-id=${val.idpelanggan}>DEL</button></td>
                // <td><button type="button" class="btn btn-warning btn-ubahdua" data-id=${val.idpelanggan}>UBAH</button></td>

                $("#satudua").html(content);
            }
        });
    }
    
    $("#orderdetail").click(function (e) { 
        e.preventDefault();
        selectDataOrderDetail();
    });

    //------------------------------------------------------------------------------------------------------------------------------

    function selectDataBarang() {
        $.ajax({
            type: "get",
            url: "https://dummyjson.com/products",
            dataType: "json",
            success: function (response) {

                let barang = `<h5>Barang: </h5>
                            <tr>
                            <th>Delete</th>
                            <th>Update</th>
                            <th>Tambah</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Discount Percentage</th>
                            <th>Rating</th>
                            <th>Stock</th>
                            <th>Brand</th>
                            <th>Categori</th>
                            <th>Thumbnail</th>
                            <th>Images</th>
                            </tr>`;

                $.each(response.products, function (key, val) { 
                     barang += `<tr>
                            <td><button type="button" class="btn btn-danger btn-delempat" id="idbarang" data-id=${val.id}>DEL</button></td>
                            <td><button type="button" id="btn-tambahhh" class="btn btn-warning btn-ubahbaranggg" data-bs-toggle="modal" data-bs-target="#barangmodal" id="idpelanggann" data-id=${val.id}>UBAH</button></td>
                            <td><button type="button" class="btn btn-success btn-tampiltiga" id="idbarang" data-id=${val.id}>Cart</button></td>
                            <td id="idbarang">${val.id}</td>
                            <td id="barrang">${val.title}</td>
                            <td>${val.description}</td>
                            <td id="harga">${val.price}</td>
                            <td>${val.discountPercentage}</td>
                            <td>${val.rating}</td>
                            <td id="jumlah">${val.stock}</td>
                            <td id="brand">${val.brand}</td>
                            <td>${val.category}</td>
                            <td>${val.thumbnail}</td>
                            <td>${val.images}</td>
                            </tr>`
                });

                $("#satuempat").html(barang);
            }
        });
    }
    
    $("#barang").click(function (e) { 
        e.preventDefault();
        selectDataBarang();
    });

    $("#panggil").click(function (e) { 
        e.preventDefault();
        selectDataBarang();
    });

    //------------------------------------------------------------------------------------------------------------------------------

    let idbaranggg = "";
    let title = "";
    let description = "";
    let price = "";
    let discountPercentage = "";
    let rating = "";
    let stock = "";
    let brand = "";
    let category = "";
    let thumbnail = "";


    $("#submitbarang").click(function (e) { 
        e.preventDefault();
        idbaranggg = $("#id").val();
        title = $("#title").val();
        description = $("#description").val();
        price = $("#price").val();
        discountPercentage = $("#discountPercentage").val();
        rating = $("#rating").val();
        stock = $("#stock").val();
        brand = $("#brand").val();
        category = $("#category").val();
        thumbnail = $("#thumbnail").val();

        if (idbaranggg == "") {
            insertDataBarang();
        } else {
            updateDataBarang();
        }

        $("#id").val("");
        $("#title").val("");
        $("#description").val("");
        $("#price").val("");
        $("#discountPercentage").val("");
        $("#rating").val("");
        $("#stock").val("");
        $("#brand").val("");
        $("#category").val("");
        $("#thumbnail").val("");

    });

    $("#btn-tambahhh").click(function (e) { 
        e.preventDefault();
        
        $("#judulll").html("<h4>Tambah Data</h4>");

        $("#id").val("");
        $("#title").val("");
        $("#description").val("");
        $("#price").val("");
        $("#discountPercentage").val("");
        $("#rating").val("");
        $("#stock").val("");
        $("#brand").val("");
        $("#category").val("");
        $("#thumbnail").val("");

    });


    function insertDataBarang() {
        let tambahBarang = {
            idbaranggg : idbaranggg,
            title : title,
            description : description,
            price : price,
            discountPercentage : discountPercentage, 
            rating : rating,
            stock : stock,
            brand : brand,
            category : category,
            thumbnail : thumbnail
        }

        $.ajax({
            type: "post",
            method: "post",
            url: "https://dummyjson.com/products/add",
            data: JSON.stringify(tambahBarang),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },

            success: function (response) {
                console.log(response);
            }
        });

        selectDataBarang();
    }

    //------------------------------------------------------------------------------------------------------------------------------

    $("tbody").on("click", ".btn-ubahbaranggg", function () {
        let id = $(this).attr("data-id");
        selectUpdateBarang(id);
    });

    $("tbody").on("click", ".btn-ubahbaranggg", function () {
        $("#judulll").html("<h4>Ubah Data</h4>");
        selectUpdateBarang(id);
    });


    //------------------------------------------------------------------------------------------------------------------------------


    function selectUpdateBarang(id) {
        $.ajax({
            type: "get",
            url: `https://dummyjson.com/products/${id}`,
            dataType: "json",
            success: function (response) {
                $("#id").val(response.id);
                $("#title").val(response.title);
                $("#description").val(response.description);
                $("#price").val(response.price);
                $("#discountPercentage").val(response.discountPercentage);
                $("#rating").val(response.rating);
                $("#stock").val(response.stock);
                $("#brand").val(response.brand);
                $("#category").val(response.category);
                $("#thumbnail").val(response.thumbnail);
            }
        });
    }


    //------------------------------------------------------------------------------------------------------------------------------


    function updateDataBarang(id) {

        let updateBarang = {
            idbaranggg : idbaranggg,
            title : title,
            description : description,
            price : price,
            discountPercentage : discountPercentage, 
            rating : rating,
            stock : stock,
            brand : brand,
            category : category,
            thumbnail : thumbnail
        }

        $.ajax({
            type: "post",
            method: "put",
            url: `https://dummyjson.com/products/${id}`,
            data: JSON.stringify(updateBarang),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            success: function (response) {
                console.log(response);
            }
        });
    }

    //------------------------------------------------------------------------------------------------------------------------------


    let idorder = "";
    let idbarang = "";
    let jumlah = "";
    let harga = "";
    let barrang = "";
    let idpelanggann = "";
    let pelanggann = "";
    let alamatt = "";
    let telepun = "";

    
    $("tbody").on("click","#btn-toorder", function () {
    

        // idorder = $("#idorder").text();
        idbarang = $("#idbarang").text();
        jumlah = $("#jumlah").text();
        harga = $("#harga").text();
        barrang = $("#barrang").text();
        idpelanggann = $("#idpelanggann").text();
        pelanggann = $("#pelanggann").text();
        alamatt = $("#alamatt").text();
        telepun = $("#telepun").text();


        if (idorder == "") {
            addToCart();
        }

        // $("#idorder").text("");
        $("#idbarang").text("");
        $("#jumlah").text("");
        $("#harga").text("");
        $("#barrang").text("");
        $("#idpelanggann").text("");
        $("#pelanggann").text("");
        $("#alamatt").text("");
        $("#telepun").text("");

    });


    //------------------------------------------------------------------------------------------------------------------------------


    function addToCart() {
        let pelangganbarang = {
            idorder : 2,
            idbarang : idbarang,
            jumlah : jumlah,
            harga : harga,
            barrang : barrang,
            idpelanggann : idpelanggann,
            pelanggann : pelanggann,
            alamatt : alamatt,
            telepun : telepun
        }


        $.ajax({
            type: "post",
            url: "http://localhost/tugas/php/addtocart.php",
            data: JSON.stringify(pelangganbarang),
            success: function (response) {
                let output = `<p>${response}</p>`;
                $("#msg").html(output);
            }
        });
    }


    //------------------------------------------------------------------------------------------------------------------------------


    $("tbody").on("click", ".btn-tampiltiga", function () {
        let id = $(this).attr("data-id");
        selectSatuBarang(id);
    });


    function selectSatuBarang(id) {
        $.ajax({
            type: "get",
            url: `https://dummyjson.com/products/${id}`,
            dataType: "json",
            success: function (response) {
                let barang = `
                            <button type="button" id="btn-toorder" class="btn btn-primary my-3 vertical-center" >Add to Cart</button>
                            <h5>Barang yang dipilih: </h5>
                            <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Stock</th>
                            </tr>
                            <tr>
                            <td id="idbarang">${response.id}</td>
                            <td id="barrang">${response.title}</td>
                            <td id="harga">${response.price}</td>
                            <td id="jumlah">${response.stock}</td>
                            </tr>
                            </tbody>
                            </table>`;


                $("#satusatu").html(barang);
            }
        });
    }


    //------------------------------------------------------------------------------------------------------------------------------


    $("tbody").on("click", ".btn-delempat", function () {
        let id = $(this).attr("data-id");
        deleteSatuBarang(id);
    });

    function deleteSatuBarang(id) {

        $.ajax({
            type: "get",
            method: "delete",
            url: `https://dummyjson.com/products/${id}`,
            dataType: "json",
            success: function (response) {

                console.log(response);

            }
        });
    }
    
    //------------------------------------------------------------------------------------------------------------------------------
    
});
