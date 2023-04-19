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
  
  <!-- Update statusbar layout for X5 -->
  <xsl:template match="//export:data//commandBarData[@guid='8dd1c11e-7a20-4c92-b635-4b1ef0073493']/container">
    <xsl:choose>
      <xsl:when test="not(./events)">
        <xsl:copy>
          <xsl:apply-templates select="@*"/>
            <events><onModeSwitch><action name="default"/></onModeSwitch></events> <!--: Normal Mode-->
            <container modeID="3ae1b504-2286-20aa-4bcb-181519c61ba8">
              <xsl:apply-templates select="node()"/> <!--: Imported items -->
            </container>
            <container modeID="9c765ff2-14c8-f9af-45b0-f97e0bec6d6b"> <!--: "In Progress" mode -->
              <container modeID="61f39032-92fb-1593-4da3-e5b213d9f79b" topBinding="true" rightBinding="true">
                <item guidRef="feac20a0-0e6e-698d-45f1-e6ad9207e555" itemFace="textOnly"/> <!--: Progress Text -->
                <item margin="0,2,0,2" guidRef="0cd3558c-375f-888e-4202-38d0834ee347"/> <!--: Progress Bar -->
              </container>
            </container>
        </xsl:copy>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
  <!-- Remove obsolete items -->
  <xsl:template match="//export:data//commandBarData[@guid='acea4777-2db5-42db-b4cc-38b992ee8d3d']" />
  <xsl:template match="//export:data//commandBar[@guidRef='acea4777-2db5-42db-b4cc-38b992ee8d3d']" />
  
</xsl:stylesheet>
