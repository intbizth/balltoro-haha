<?php

namespace AppBundle\Entity;

use Gedmo\Timestampable\Timestampable;

class Photo implements ImageInterface, Timestampable
{
    use \Gedmo\Timestampable\Traits\Timestampable;

    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $title;

    /**
     * @var \SplFileInfo
     */
    private $file;

    /**
     * @var string
     */
    private $path;

    /**
     * @var Category
     */
    private $category;

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
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * {@inheritdoc}
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * {@inheritdoc}
     */
    public function setFile(\SplFileInfo $file)
    {
        $this->file = $file;
    }

    /**
     * {@inheritdoc}
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * {@inheritdoc}
     */
    public function setPath($path)
    {
        $this->path = $path;
    }

    /**
     * {@inheritdoc}
     */
    public function hasFile()
    {
        return !!$this->file;
    }

    /**
     * {@inheritdoc}
     */
    public function hasPath()
    {
        return !!$this->path;
    }

    /**
     * @return Category
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @param Category $category
     */
    public function setCategory(Category $category = null)
    {
        $this->category = $category;
    }
}
