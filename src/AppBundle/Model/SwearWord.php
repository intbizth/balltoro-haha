<?php

namespace AppBundle\Model;

use Gedmo\Timestampable\Traits\Timestampable;

class SwearWord implements SwearWordInterface
{
    use Timestampable;

    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $swear;

    /**
     * @var string
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
