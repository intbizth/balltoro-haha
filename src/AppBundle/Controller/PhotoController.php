<?php

namespace AppBundle\Controller;

use DoS\ResourceBundle\Controller\ResourceController;
use Symfony\Component\HttpFoundation\RedirectResponse;

class PhotoController extends ResourceController
{
    public function pictureUrlAction($path, $sizing = null)
    {
        $cacheManager = $this->container->get('liip_imagine.cache.manager');
        $config = array();

        if ($sizing) {
            list($w, $h) = explode('x', $sizing);
            $config = array(
                'thumbnail' => array(
                    'size' => array($w, $h)
                )
            );
        }

        $imageUrl = $cacheManager->getBrowserPath($path, 'filter', $config);

        return new RedirectResponse($imageUrl);
    }
}
