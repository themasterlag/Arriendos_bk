const express = require('express');

const router = express.Router();

const fs = require('fs');

router.post('/upload', async(req,res, next)=>{
  try {
    let archivo = req.files;

    const uFiles = [archivo].map((file)=>{
      console.log(file);
      return new Promise(function (resolve) {
       // console.log(file.adjunto);
        fs.writeFile(`../Proyecto_Arriendos_bk/archivos/${[archivo.adjunto.name]}`, file.adjunto.data, function (err) {
          if (err) {
            return next(err);
          }
          return resolve();
        });
      });
    });
    await Promise.all(uFiles);


    console.log(archivo.adjunto);
   /* archivo.adjunto.mv(`./../archivos/${archivo.adjunto.name}`, err =>{
      if(err) return next(err)
      return res.status(200).send({ message:'Fino pai'})
    })
    console.log('ae');
*/



  } catch (error) {
    if (error.codigo) {
      res.status(error.codigo).send(error);
    }
    else{
      res.status(500).send(error);
    }
  }
})

module.exports = router;
