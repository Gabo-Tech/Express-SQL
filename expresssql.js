const express = require("express");
const app = express();
const mysql = require('mysql2');
const port = 3000;
app.use(express.json())

// const db = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'my-secret-password',
// });
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'my-secret-password',
    database:'expressDB'
  });


  //Implementar base de datos
db.connect();

//Crear base de datos
// app.get('/createdb',(req,res)=>{
//     let sql ='CREATE DATABASE expressDB';
//     db.query(sql,(err,result)=>{
//       if(err)throw err;
//       console.log(result);
//       res.send('Database created...')
//     })
//   })


//Crear tablas
app.get('/createtable_products',(req,res)=>{
    let sql = 'CREATE TABLE products(id int AUTO_INCREMENT,productname VARCHAR(255), productdescription VARCHAR(255),price INT, PRIMARY KEY(id))'
      db.query(sql,(err,result)=> {
        if(err) throw err;
        console.log(result);
        res.send('Products table created...')
      })
    })
    app.get('/createtable_categories',(req,res)=>{
        let sql = 'CREATE TABLE categories(id INT AUTO_INCREMENT, name_category VARCHAR(50),_description VARCHAR(50), PRIMARY KEY(id));'
          db.query(sql,(err,result)=> {
            if(err) throw err;
            console.log(result);
            res.send('Categories table created...')
          })
        })
        app.get('/createtable_mixed',(req,res)=>{
            let sql = 'CREATE TABLE productoscategorias(id INT AUTO_INCREMENT, product_id INT, category_id INT, PRIMARY KEY(id), FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE, FOREIGN KEY(category_id) REFERENCES categories(id));'
              db.query(sql,(err,result)=> {
                if(err) throw err;
                console.log(result);
                res.send('Product-Categories table created...')
              })
            })

//Añadir un post
    // app.post("/", (req, res) => {
    //     let sql = `INSERT INTO posts (title, body) values
    //       ('Post one', 'This is post number one');`;
    //     db.query(sql, (err, result) => {
    //       if (err) throw err;
    //       console.log(result);
    //       res.send("Post added...");
    //     });
    //   });





      //Crea un endpoint para añadir un producto nuevo y añade 2 productos nuevos desde el postman
      app.post('/products/',(req,res)=>{
        let product = {productname:req.body.productname, productdescription:req.body.productdescription, price:req.body.price};
        let sql = 'INSERT INTO products SET ?'
        db.query(sql,product,(err,result)=> {
          if(err) throw err;
          console.log(result);
          res.send('Product added...')
        })
      })



      //Crea un endpoint para crear una categoría y añade 2 categorías nuevas desde el postman

      app.post('/categories/',(req,res)=>{
        let category = {name_category:req.body.name_category, _description:req.body.description};
        let sql = 'INSERT INTO categories SET ?'
        console.log(category);
        db.query(sql,category,(err,result)=> {
          if(err) throw err;
          console.log(result);
          res.send('Category added...')
        })
      })


    //   app.get('/',(req,res)=> {
    //     let sql = 'SELECT * FROM posts';
    //     db.query(sql,(err,result)=> {
    //       if(err) throw err;
    //       res.send(result)
    //     })
    //   })

      //Crea un endpoint para actualizar un producto. 
      app.put('/product/:id',(req,res)=>{
        let newProductName = req.body.productname;
        let newProductDescription = req.body.productdescription;
        let newProductPrice = req.body.price;
        let sql = `UPDATE products SET productname = '${newProductName}',productdescription = '${newProductDescription}',price = '${newProductPrice}' WHERE id = ${req.params.id}`;
        db.query(sql, (err,result)=> {
          if(err) throw err;
          res.send('Product updated...')
        })
      })
 
      //Crea un endpoint para actualizar una categoría.
      app.put('/category/:id',(req,res)=>{
        let newCategoryName = req.body.name_category;
        let newCategoryDescription = req.body.description;
        let sql = `UPDATE categories SET name_category = '${newCategoryName}', _description = '${newCategoryDescription}' WHERE id = ${req.params.id}`;
        db.query(sql, (err,result)=> {
          if(err) throw err;
          res.send('Category updated...')
        })
      })

      //Crea un endpoint que muestre todos los productos

      app.get("/allproducts", (req, res) => {
        db.query("SELECT * FROM products;", (err, result) => {
          if (err) throw err;
      
          console.log(result);
      
          res.send(result);
        });
      });
      //Crea un endpoint que muestre todas las categorías

      app.get("/allcategories", (req, res) => {
        db.query("SELECT * FROM categories;", (err, result) => {
          if (err) throw err;
      
          console.log(result);
      
          res.send(result);
        });
      });


      //Crea un endpoint que muestra todos los productos con sus categorías
      app.get("/productoscategorias", (req, res) => {
        db.query("SELECT * FROM productoscategorias;", (err, result) => {
          if (err) throw err;
      
          console.log(result);
      
          res.send(result);
        });
      });


            //Crea un endpoint donde puedas seleccionar un producto por id

            app.get('/productid/:id',(req,res)=>{
                let sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
                db.query(sql,(err,result)=> {
                  if(err) throw err;
                  res.send(result)
                })
              })

//Crea un endpoint que muestre de forma descendente los productos.
app.get("/allproductsd", (req, res) => {
    db.query("SELECT * FROM products ORDER BY id DESC;", (err, result) => {
      if (err) throw err;
  
      console.log(result);
  
      res.send(result);
    });
  });

     //Crea un endpoint donde puedas seleccionar una categoría por id

     app.get('/categoryid/:id',(req,res)=>{
        let sql = `SELECT * FROM categories WHERE id = ${req.params.id}`;
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      })

       //Crea un endpoint donde puedas buscar un producto por su nombre


       app.get('/productname/:name',(req,res)=>{
        let sql = `SELECT * FROM products WHERE productname = "${req.params.name}"`;
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      })


      //Crea un endpoint donde puedas eliminar un producto por su id
      app.delete('/delete/:id',(req,res)=>{
        let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
        db.query(sql, (err,result)=> {
          if(err) throw err;
          res.send('Post deleted')
        })
      })
      
      app.listen(port, () => {
        console.log(`Servidor levantado en el puerto ${port}`);
      })
