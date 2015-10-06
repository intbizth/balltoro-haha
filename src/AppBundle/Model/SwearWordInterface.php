<?php

/*
 * This file is part of the Intbizth Toro Project.
 *
 * (c) Intbizth
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace AppBundle\Model;

use Gedmo\Timestampable\Timestampable;

interface SwearWordInterface extends Timestampable
{
    /**
     * @return int
     */
    public function getId();

    /**
     * @return string
     */
    public function getSwear();

    /**
     * @param string $swear
     */
    public function setSwear($swear);

    /**
     * @return string
     */
    public function getReplacement();

    /**
     * @param string $replacement
     */
    public function setReplacement($replacement);
}
