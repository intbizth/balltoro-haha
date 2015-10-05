<?php

namespace AppBundle\Controller\Admin;

use AppBundle\Controller\AdminController;
use AppBundle\Entity\Photo;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class CategoryController extends AdminController
{
    /**
     * @Route("/admin/categories", name="admin_categories")
     */
    public function createAction(Request $request)
    {
        $categories = (array) $this->getDoctrine()
            ->getRepository('AppBundle:Category')
            ->findAll()
        ;

        return JsonResponse::create($categories);
    }
}
