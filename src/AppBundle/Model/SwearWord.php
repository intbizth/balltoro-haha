<?php

namespace AppBundle\Model;

use Gedmo\Timestampable\Traits\Timestampable;
use JMS\Serializer\Annotation as JMS;

class SwearWord implements SwearWordInterface
{
    use Timestampable;

    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     * @JMS\Expose()
     */
    private $swear;

    /**
     * @var string
     * @JMS\Expose()
     */
    private $replacement;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getSwear()
    {
        return $this->swear;
    }

    /**
     * @param string $swear
     */
    public function setSwear($swear)
    {
        $this->swear = $swear;
    }

    /**
     * @return string
     */
    public function getReplacement()
    {
        return $this->replacement;
    }

    /**
     * @param string $replacement
     */
    public function setReplacement($replacement)
    {
        $this->replacement = $replacement;
    }
}