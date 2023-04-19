<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:export="export">
  <xsl:output method="xml" encoding="UTF-8" indent="yes"/>
  <xsl:template match="node()[./*]"><xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy></xsl:template>
  <xsl:template match="node()|@*"><xsl:copy-of select="."/></xsl:template>

  <!-- Add new "lockToolbars" frame attribute for X5 -->
  <xsl:template match="//export:data//frame[not(@lockToolbars)]">
    <xsl:copy>
      <xsl:attribute name="lockToolbars">true</xsl:attribute>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>
  
  <!-- Remove obsolete items -->
  <xsl:template match="//export:data//commandBarData[@guid='acea4777-2db5-42db-b4cc-38b992ee8d3d']" />
  <xsl:template match="//export:data//commandBar[@guidRef='acea4777-2db5-42db-b4cc-38b992ee8d3d']" />
  
</xsl:stylesheet>
