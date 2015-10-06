<?php

namespace AppBundle\Controller;

use AppBundle\Model\SwearWordInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     * @Template("AppBundle:Front:index.html.twig")
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
        $words = $this->get('app.repository.swear_word')->findAll();
        $output = array();

        /** @var SwearWordInterface $word */
        foreach ($words as $word) {
            $output[$word->getSwear()] = $word->getReplacement();
        }

        return JsonResponse::create(['sw' => json_encode($output)]);
    }
}
