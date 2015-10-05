<?php

namespace AppBundle\Controller\Admin;

use AppBundle\Controller\AdminController;
use AppBundle\Entity\Photo;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

class PhotoController extends AdminController
{
    /**
     * @Route("/admin/photo/create", name="admin_photo_create")
     * @Template()
     */
    public function createAction(Request $request)
    {
        $photo = new Photo();
        $form = $this->createForm('photo', $photo);

        return array(
            'form' => $form->createView(),
        );
    }
}
