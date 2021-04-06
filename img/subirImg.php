<?php
    if (($_FILES["file"]["type"] == "image/pjpeg")
        || ($_FILES["file"]["type"] == "image/jpeg")
        || ($_FILES["file"]["type"] == "image/png")
        || ($_FILES["file"]["type"] == "image/gif")) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $_FILES['name']['name'])) {
            echo "ok";
        } else {
            echo "Error al guardar la iamgen";
        }
    } else {
        echo "Formato erróneo";
    }
?>