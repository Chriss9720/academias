<?php
    if (($_FILES["file"]["type"] == "application/pdf")) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $_FILES['name']['name'])) {
            echo 1;
        } else {
            echo -1;
        }
    } else {
        echo -2;
    }
?>