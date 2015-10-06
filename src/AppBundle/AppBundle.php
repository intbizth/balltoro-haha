<?php

namespace AppBundle;

use DoS\ResourceBundle\DependencyInjection\AbstractResourceBundle;

class AppBundle extends AbstractResourceBundle
{
    protected function getModelNamespace()
    {
        return 'AppBundle\Model';
    }

    protected function getModelInterfaces()
    {
        return array(
            'AppBundle\Model\CategoryInterface' => 'app.model.category.class',
            'AppBundle\Model\PhotoInterface' => 'app.model.photo.class',
        );
    }
}
