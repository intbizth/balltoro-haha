<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        return ['foo' => 'bar'];
    }

    /**
     * @Route("/swears", name="swears", defaults={"_format"="json"})
     */
    public function swearsAction(Request $request)
    {
        return JsonResponse::create(['sw' => json_encode([
            'เหี้ย' => 'ตัวเทอ',
            'เป็ด' => 'หงส์ฟ้า',
            'กาก' => 'น่ากราบ',
            'ควย' => 'รวย',
            'ไอ้' => 'คุณ',
        ])]);
    }
}
