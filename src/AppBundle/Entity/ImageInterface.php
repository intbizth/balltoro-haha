<?php

namespace AppBundle\Entity;

interface ImageInterface
{
    /**
     * @return Boolean
     */
    public function hasFile();

    /**
     * @return null|\SplFileInfo
     */
    public function getFile();

    /**
     * @param \SplFileInfo $file
     */
    public function setFile(\SplFileInfo $file);

    /**
     * @return Boolean
     */
    public function hasPath();

    /**
     * @return string
     */
    public function getPath();

    /**
     * @param string $path
     */
    public function setPath($path);
}
